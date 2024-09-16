import { z } from "zod";

const finalRule = z.string().trim().min(1, "You must select a Labor Type");

export const LaborTypeRuleFinal = z.object({
  LaborType: finalRule,
});
