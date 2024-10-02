import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { CAFTOPLabor } from "api/CAFTOP/types";
import { Radio } from "@fluentui/react-components";

export const LaborType = () => {
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
