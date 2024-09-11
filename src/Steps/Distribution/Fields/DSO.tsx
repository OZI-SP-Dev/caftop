import { z } from "zod";
import { CAFTOPDistribution } from "api/CAFTOP";
import { Radio } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Distribution } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validation";

/** Rule for when the DSO is Not Applicable */
export const dsoRuleNA = z.object({
  hasDSO: populateWithDefaultValue(Distribution.hasDSO),
});

export const dsoRuleSave = z.object({
  hasDSO: z.enum(["no", "yes", ""]),
});

export const dsoRuleFinal = z.object({
  hasDSO: z.enum(["no", "yes"], {
    message: "You must select whether or not DSO is utiilized",
  }),
});

const DSO = () => {
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

export default DSO;
