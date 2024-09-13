import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Program Name from the list");

export const ProgramNameRuleFinal = z.object({
  ProgramName: finalRule,
});
