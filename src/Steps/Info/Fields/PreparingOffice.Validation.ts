import { z } from "zod";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must enter a Preparing Office")
  .max(20, "Preparing Office cannot exceed 20 characters");

export const PreparingOfficeRuleFinal = z.object({
  PreparingOffice: finalRule,
});
