import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Lead Command from the list");

export const LeadCommandRuleFinal = z.object({
  LeadCommand: finalRule,
});
