import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { CAFTOPLabor } from "api/CAFTOP";
import { Radio } from "@fluentui/react-components";

const LaborType = () => {
  return (
    <BACRadioGroup<CAFTOPLabor>
      name="LaborType"
      labelText="Labor Type"
      rules={{ required: true }}
      fieldProps={{ layout: "horizontal" }}
    >
      <Radio value="contractor" label="Contractor" />
      <Radio value="organic" label="Organic" />
    </BACRadioGroup>
  );
};

export default LaborType;
