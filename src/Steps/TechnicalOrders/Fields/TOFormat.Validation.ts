import { z } from "zod";

const formatRulesSave = z.array(z.string());

const formatRulesFinal = z
  .array(z.string())
  .min(1, "At least 1 Technical Order Format item must be selected");

const otherFormatRuleSave = z.string().optional();
const otherFormatRuleFinal = z.string().optional();

export const toFormatRuleSave = z
  .object({
    TOFormat: formatRulesSave,
    TOOtherFormat: otherFormatRuleSave,
  })
  .transform((obj) =>
    obj.TOFormat.includes("Other") ? obj : { ...obj, TOOtherFormat: "" }
  );

export const toFormatRuleFinal = z
  .object({
    TOFormat: formatRulesFinal,
    TOOtherFormat: otherFormatRuleFinal,
  })
  .refine(
    (obj) =>
      !obj.TOFormat.includes("Other") ||
      (obj.TOFormat.includes("Other") && obj.TOOtherFormat?.length != 0),
    {
      message: "You must specify Other format if it is selected",
      path: ["TOOtherFormat"],
    }
  )
  .transform((obj) =>
    obj.TOFormat.includes("Other") ? obj : { ...obj, TOOtherFormat: "" }
  );
