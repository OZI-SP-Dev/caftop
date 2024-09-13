import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a PEC from the list");

export const ProgramElementCodeRuleFinal = z.object({
  ProgramElementCode: finalRule,
});
