import { z } from "zod";

const firstNameRule = z
  .string()
  .trim()
  .min(1, "First Name is required")
  .max(40, "First Name cannot exceed 40 characters");
const lastNameRule = z
  .string()
  .trim()
  .min(1, "Last Name is required")
  .max(80, "Last Name cannot exceed 80 characters");
const phoneRule = z
  .string()
  .trim()
  .regex(/\(\d{3}\)\s\d{3}-\d{4}/, "Phone must be in the format (###) ###-####")
  .min(1, "Phone is required");
const finalEmailRule = z
  .string()
  .trim()
  .email()
  .min(1, "Email is required")
  .max(320, "Email cannot exceed 320 characters");

export const ProgramManagersRuleFinal = z.object({
  ProgramManagers: z
    .array(
      z.object({
        FirstName: firstNameRule,
        LastName: lastNameRule,
        Phone: phoneRule,
        Email: finalEmailRule,
      })
    )
    .max(8, "No more than 8 Program Managers are allowed")
    .min(1, "At least 1 Program Manager must be selected"),
});
