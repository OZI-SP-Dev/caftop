import { z } from "zod";
import { Distribution } from "api/CAFTOP/defaults";
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
