import { CAFTOPTechnicalOrders } from "api/CAFTOP";
import { Text } from "@fluentui/react-components";
import BACInput from "components/BaseFormFields/BACInput";

const TOAPMigration = () => {
  return (
    <fieldset>
      <legend>
        <Text weight="semibold">Number of Technical Orders</Text>
      </legend>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumElectronic"
          labelText="Electronic WA-1 or WA-2"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumPaper"
          labelText="Paper"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumCDDVD"
          labelText="CD/DVD"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumUnpublished"
          labelText="Unpublished"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumInAcquisition"
          labelText="In Acquistion"
          rules={{ required: true }}
          fieldProps={{ type: "number", min: 0, step: 1 }}
        />
      </div>
    </fieldset>
  );
};

export default TOAPMigration;
