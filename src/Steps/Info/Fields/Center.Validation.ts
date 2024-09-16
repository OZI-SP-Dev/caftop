import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Center from the list");

export const CenterRuleFinal = z.object({
  Center: finalRule,
});
