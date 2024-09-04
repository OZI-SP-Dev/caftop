import { z } from "zod";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP";

const baseRule = z.string().trim();

export const configurationplanRuleSave = z.object({
  ConfigurationPlan: baseRule,
});

export const configurationplanRuleFinal = z.object({
  ConfigurationPlan: baseRule.min(1, "You must enter a Configuration Plan"),
});

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
