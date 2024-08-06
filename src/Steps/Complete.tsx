import { FormEvent, useContext } from "react";
import { globalContext } from "../stateManagement/GlobalStore";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import expressions from "docxtemplater/expressions";

const Complete = () => {
  const { globalState } = useContext(globalContext);

  function handleSubmit(e: FormEvent) {
    // TODO: Add in the logic to validate data is good (BAC-176) for now, assume good
    generateDocument();
    e.preventDefault();
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
        doc.render(globalState);

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
      <ul className="text-start">
        <li>
          When CAFTOP is completed, document can be generated with “Generate
          Document” selection
        </li>
        <li>
          When finished with CAFTOP Template select “Close and Reset” to clear
          all user input
        </li>
      </ul>
    </div>
  );
};

export default Complete;
