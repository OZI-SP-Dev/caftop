import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Program Group from the list");

export const ProgramGroupRuleFinal = z.object({
  ProgramGroup: finalRule,
});
