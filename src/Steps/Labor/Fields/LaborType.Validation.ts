import { z } from "zod";

const finalRule = z.array(z.string()).min(1, "You must select a Labor Type");

export const LaborTypeRuleFinal = z.object({
  LaborType: finalRule,
});
