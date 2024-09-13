import { z } from "zod";

const finalRule = z.string().trim().min(1, "You must enter a Description");

export const DescriptionRuleFinal = z.object({
  Description: finalRule,
});
