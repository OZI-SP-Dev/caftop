import { formatPhone } from "utilities/Phone";
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
  .regex(/^([^\d]*\d){10}$/, "Phone must contain 10 digits") // Match anystring as long as it has 10 digits
  .min(1, "Phone is required")
  .transform((value) => {
    // Transform in validation, as onBlur is not guarenteed to run and update value before save
    return formatPhone(value);
  });
const finalEmailRule = z
  .string()
  .trim()
  .email()
  .min(1, "Email is required")
  .max(320, "Email cannot exceed 320 characters");

export const TechOrderManagersRuleFinal = z.object({
  TechOrderManagers: z
    .array(
      z.object({
        FirstName: firstNameRule,
        LastName: lastNameRule,
        Phone: phoneRule,
        Email: finalEmailRule,
      })
    )
    .max(8, "No more than 8 Technical Order Managers are allowed")
    .min(1, "At least 1 Technical Order Manager must be selected"),
});
