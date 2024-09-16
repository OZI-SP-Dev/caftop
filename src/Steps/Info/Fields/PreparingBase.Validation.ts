import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Preparing Base from the list");

export const PreparingBaseRuleFinal = z.object({
  PreparingBase: finalRule,
});
