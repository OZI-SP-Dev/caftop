import { z } from "zod";

const numberRulesBase = (fieldName: string) => {
  return z.coerce
    .number()
    .int(`Number of ${fieldName} must be a whole number`)
    .gte(0, `Number of ${fieldName} must be greater than or equal to zero`)
    .safe();
};

const numberRulesSave = (fieldName: string) => {
  return z.literal("").or(numberRulesBase(fieldName));
};

const numberRulesFinal = (fieldName: string) => {
  return z
    .number()
    .or(
      z
        .string()
        .min(1, `Number of ${fieldName} must be greater than or equal to zero`)
    )
    .pipe(numberRulesBase(fieldName));
};

export const tocountsRuleSave = z.object({
  NumElectronic: numberRulesSave("Electronic"),
  NumPaper: numberRulesSave("Paper"),
  NumCDDVD: numberRulesSave("CD/DVD"),
  NumUnpublished: numberRulesSave("Unpublished"),
  NumInAcquisition: numberRulesSave("In Acquisition"),
});

export const tocountsRuleFinal = z.object({
  NumElectronic: numberRulesFinal("Electronic"),
  NumPaper: numberRulesFinal("Paper"),
  NumCDDVD: numberRulesFinal("CD/DVD"),
  NumUnpublished: numberRulesFinal("Unpublished"),
  NumInAcquisition: numberRulesFinal("In Acquisition"),
});
