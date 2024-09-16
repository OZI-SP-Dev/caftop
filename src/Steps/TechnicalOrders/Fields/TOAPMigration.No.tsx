import { CAFTOPTechnicalOrders } from "api/CAFTOP";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { TOAPMigrationWaiver } from "./TOAPMigration.Waiver";

export const TOAPMigrationNo = () => {
  return (
    <>
      <TOAPMigrationWaiver />
      <div className="requestFieldContainer">
        <BACTextarea<CAFTOPTechnicalOrders>
          name="PlanToConvert"
          labelText="Plans to convert to TOAP"
          labelInfo="For examples, please see the CAFTOP Handbook"
          rules={{ required: true }}
          fieldProps={{
            rows: 6,
            resize: "vertical",
          }}
        />
      </div>
    </>
  );
};
