import { CAFTOPTechnicalOrders } from "api/CAFTOP";
import BACInput from "components/BaseFormFields/BACInput";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { useWatch } from "react-hook-form";
import TOAPMigrationWaiver from "./TOAPMigration.Waiver";

const TOAPMigrationPartially = () => {
  const numWillNotBeAuthoredInTOAP = useWatch<
    CAFTOPTechnicalOrders,
    "NumWillNotBeAuthoredInTOAP"
  >({
    name: "NumWillNotBeAuthoredInTOAP",
  });

  return (
    <>
      <TOAPMigrationWaiver />
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumAuthoredInTOAP"
          labelText="Number of TOs authored in TOAP"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumNotAuthoredInTOAP"
          labelText="Number of TOs not authored in TOAP"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumWillNotBeAuthoredInTOAP"
          labelText="Number of TOs that will not be authored in TOAP"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
      {Number(numWillNotBeAuthoredInTOAP) > 0 && (
        <div className="requestFieldContainer">
          <BACTextarea<CAFTOPTechnicalOrders>
            name="Explanation"
            labelText="Explanation of why the TOs will not be authored in TOAP, identifying the constraints, justification and list the plan of action"
            rules={{ required: true }}
            fieldProps={{
              rows: 6,
              resize: "vertical",
            }}
          />
        </div>
      )}
    </>
  );
};

export default TOAPMigrationPartially;