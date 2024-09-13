import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP";

const ConfigurationPlan = () => {
  return (
    <BACTextarea<CAFTOPDescription>
      name="ConfigurationPlan"
      labelText="Configuration Plan"
      labelInfo="For examples, please refer to the CAFTOP Handbook"
      rules={{ required: true }}
      fieldProps={{
        rows: 6,
        resize: "vertical",
      }}
    />
  );
};

export default ConfigurationPlan;
