import { CAFTOPDistribution } from "api/CAFTOP";
import { Radio } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

export const DSO = () => {
  return (
    <BACRadioGroup<CAFTOPDistribution>
      name="hasDSO"
      labelText="Does the program utilize Document Services Online (DSO)?"
      rules={{ required: true }}
      fieldProps={{ layout: "horizontal" }}
    >
      <Radio value="yes" label="Yes" />
      <Radio value="no" label="No" />
    </BACRadioGroup>
  );
};
