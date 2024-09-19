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

const Complete = (props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const errors = useCheckComplete();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      e?.nativeEvent instanceof SubmitEvent &&
      e.nativeEvent?.submitter?.id === "next"
    ) {
      generateDocument();
    } else {
      props.handleSubmit(e);
    }
  }

  function generateDocument() {
    const outFileName = [
      "27", // TODO: Replace Year (BAC-137)
      globalState.Info.LeadCommand,
      globalState.Info.Center,
      globalState.Info.ProgramElementCode,
      globalState.Info.ProgramName,
      ".docx",
    ].join("_");

    const totalCount =
      (globalState.TechnicalOrders.NumAuthoredInTOAP !== ""
        ? globalState.TechnicalOrders.NumAuthoredInTOAP
        : 0) +
      (globalState.TechnicalOrders.NumNotAuthoredInTOAP !== ""
        ? globalState.TechnicalOrders.NumNotAuthoredInTOAP
        : 0) +
      (globalState.TechnicalOrders.NumWillNotBeAuthoredInTOAP !== ""
        ? globalState.TechnicalOrders.NumWillNotBeAuthoredInTOAP
        : 0) +
      (globalState.TechnicalOrders.NumUnpublished !== ""
        ? globalState.TechnicalOrders.NumUnpublished
        : 0);

    const totalTypeCount =
      (globalState.TechnicalOrders.NumPaper !== ""
        ? globalState.TechnicalOrders.NumPaper
        : 0) +
      (globalState.TechnicalOrders.NumElectronic !== ""
        ? globalState.TechnicalOrders.NumElectronic
        : 0) +
      (globalState.TechnicalOrders.NumCDDVD !== ""
        ? globalState.TechnicalOrders.NumCDDVD
        : 0);

    const approvedTOWaiverDate = formatDate(
      globalState.TechnicalOrders.TOApprovedWaiverDate ?? undefined
    );

    const approvedODSOWaiverDate = formatDate(
      globalState.Distribution.ODSOApprovedWaiverDate ?? undefined
    );

    const ctrExpirationDate = formatDate(
      globalState.Labor.ContractorSupport.ContractExpiration ?? undefined
    );

    const technicalOrders = () => ({
      ...globalState.TechnicalOrders,
      TotalCount: totalCount,
      TotalTypeCount: totalTypeCount,
      TOApprovedWaiverDate: approvedTOWaiverDate,
    });

    const distribution = {
      ...globalState.Distribution,
      ODSOApprovedWaiverDate: approvedODSOWaiverDate,
    };

    const labor = {
      ...globalState.Labor,
      ContractorSupport: {
        ...globalState.Labor.ContractorSupport,
        ContractExpiration: ctrExpirationDate,
      },
    };

    const dataForDocument = {
      ...globalState,
      TechnicalOrders: technicalOrders,
      Labor: labor,
      Distribution: distribution,
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

  return (
    <div className="m-3">
      <h1>CAFTOP Template Steps Complete</h1>
      <form id="innerForm" onSubmit={handleSubmit}></form>
      {errors.length === 0 && (
        <div>
          You have completed all information required to generate a CAFTOP. If
          you are ready to create the CAFTOP Narrative file, you can do so by
          clicking &quot;Generate Document&quot; button below.
        </div>
      )}
      {errors.length > 0 && (
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
