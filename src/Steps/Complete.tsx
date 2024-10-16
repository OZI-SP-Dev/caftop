import { FormEvent, useContext } from "react";
import { globalContext } from "../stateManagement/GlobalStore";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import expressions from "docxtemplater/expressions";
import { Link } from "@fluentui/react-components";
import { useCheckComplete } from "utilities/Validations";
import { ICAFTOPWizardStep } from "./Steps";
import { formatDate } from "utilities/Date";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";

const Complete = (_props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const caftop = useCAFTOP(globalState.id, "ALL");
  const errors = useCheckComplete();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      e?.nativeEvent instanceof SubmitEvent &&
      e.nativeEvent?.submitter?.id === "next"
    ) {
      generateDocument();
    } else if (
      e?.nativeEvent instanceof SubmitEvent &&
      e.nativeEvent?.submitter?.id.startsWith("goto_")
    ) {
      const gotoStep = parseInt(
        e.nativeEvent?.submitter?.id.replace("goto_", "")
      );
      dispatch({ type: "GOTO_STEP", payload: { wizardStep: gotoStep } });
    } else {
      dispatch({ type: "PREV_STEP" });
    }
  }

  function generateDocument() {
    if (caftop.data) {
      const caftopData = caftop.data;
      const outFileName = [
        caftopData.Year.toString().substring(2),
        caftopData.Info.LeadCommand,
        caftopData.Info.Center,
        caftopData.Info.ProgramElementCode,
        caftopData.Info.ProgramName,
        ".docx",
      ].join("_");

      const totalCount =
        (caftopData.TechnicalOrders.NumAuthoredInTOAP !== ""
          ? caftopData.TechnicalOrders.NumAuthoredInTOAP
          : 0) +
        (caftopData.TechnicalOrders.NumNotAuthoredInTOAP !== ""
          ? caftopData.TechnicalOrders.NumNotAuthoredInTOAP
          : 0) +
        (caftopData.TechnicalOrders.NumWillNotBeAuthoredInTOAP !== ""
          ? caftopData.TechnicalOrders.NumWillNotBeAuthoredInTOAP
          : 0) +
        (caftopData.TechnicalOrders.NumUnpublished !== ""
          ? caftopData.TechnicalOrders.NumUnpublished
          : 0);

      const totalTypeCount =
        (caftopData.TechnicalOrders.NumPaper !== ""
          ? caftopData.TechnicalOrders.NumPaper
          : 0) +
        (caftopData.TechnicalOrders.NumElectronic !== ""
          ? caftopData.TechnicalOrders.NumElectronic
          : 0) +
        (caftopData.TechnicalOrders.NumCDDVD !== ""
          ? caftopData.TechnicalOrders.NumCDDVD
          : 0);

      const approvedTOWaiverDate = formatDate(
        caftopData.TechnicalOrders.TOApprovedWaiverDate ?? undefined
      );

      const approvedODSOWaiverDate = formatDate(
        caftopData.Distribution.ODSOApprovedWaiverDate ?? undefined
      );

      const ctrExpirationDate = formatDate(
        caftopData.Labor.ContractorSupport.ContractExpiration ?? undefined
      );

      const technicalOrders = () => ({
        ...caftopData.TechnicalOrders,
        TotalCount: totalCount,
        TotalTypeCount: totalTypeCount,
        TOApprovedWaiverDate: approvedTOWaiverDate,
      });

      const distribution = {
        ...caftopData.Distribution,
        ODSOApprovedWaiverDate: approvedODSOWaiverDate,
      };

      const labor = {
        ...caftopData.Labor,
        ContractorSupport: {
          ...caftopData.Labor.ContractorSupport,
          ContractExpiration: ctrExpirationDate,
        },
      };

      const dataForDocument = {
        ...caftop.data,
        TechnicalOrders: technicalOrders,
        Labor: labor,
        Distribution: distribution,
        Created: formatDate(caftopData.Created ?? undefined),
      };

      // Function to allow for filter in word document to display 2-digit year rather than 4
      // example use for document {Year | twoDigit}
      expressions.filters.twoDigit = function (year: number | undefined) {
        // Make sure that if your input is undefined, your
        // output will be undefined as well and will not
        // throw an error
        if (!year) {
          return year;
        }
        return year.toString().substring(2);
      };

      // Function to allow for filter in word document to display commas within a number
      // example use for document {LaborCost | comma}
      expressions.filters.comma = function (value: number | undefined) {
        // Make sure that if your input is undefined, your
        // output will be undefined as well and will not
        // throw an error
        if (!value) {
          return value;
        }
        return value.toLocaleString();
      };

      PizZipUtils.getBinaryContent(
        ".\\CAFTOP_Template.docx",
        function (error: Error, content: string) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            parser: expressions,
          });

          // render the document
          doc.render(dataForDocument);

          // Replace the metadata for the signature lines with the Program Manager data
          let docXML = zip.files["word/document.xml"].asText();
          caftopData.Info.ProgramManagers.forEach((progManager) => {
            docXML = docXML.replace(
              `o:suggestedsigner="FirstName LastName"`,
              `o:suggestedsigner="${progManager.FirstName} ${progManager.LastName}"`
            );
            docXML = docXML.replace(
              `o:suggestedsigneremail="Email"`,
              `o:suggestedsigneremail="${progManager.Email}"`
            );
          });
          zip.file("word/document.xml", docXML);

          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
          }); //Output the document using Data-URI
          saveAs(out, outFileName);
        }
      );
    }
  }

  return (
    <div className="m-3">
      <h1>CAFTOP Template Steps Complete</h1>
      <form id="innerForm" onSubmit={handleSubmit}></form>
      {errors && errors.length === 0 && (
        <div>
          You have completed all information required to generate a CAFTOP. If
          you are ready to create the CAFTOP Narrative file, you can do so by
          clicking &quot;Generate Document&quot; button below.
        </div>
      )}
      {errors && errors.length > 0 && (
        <>
          <div>
            There is missing information, which must be completed before being
            able to generate the CAFTOP Narrative file. Please click on the
            below links to enter the missing information.
          </div>
          <ul>
            {errors.map((error) => (
              <li key={error.errortext + error.pageIndex}>
                <Link
                  onClick={() => {
                    dispatch({
                      type: "CHANGE_MODE",
                      payload: { mode: "submit" },
                    });
                    dispatch({
                      type: "GOTO_STEP",
                      payload: { wizardStep: error.pageIndex },
                    });
                  }}
                >
                  {error.errortext}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Complete;
