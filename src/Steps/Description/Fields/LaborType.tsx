import { z } from "zod";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { CAFTOPDescription } from "api/CAFTOP";
import { Radio } from "@fluentui/react-components";

const finalRule = z.string().trim().min(1, "You must select a Labor Type");

export const LaborTypeRuleFinal = z.object({
  LaborType: finalRule,
});

const LaborType = () => {
  return (
    <BACRadioGroup<CAFTOPDescription>
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
