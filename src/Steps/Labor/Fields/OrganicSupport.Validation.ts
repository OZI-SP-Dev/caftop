import { z } from "zod";
import { Labor } from "stateManagement/reducer";

const officeFinalRule = z
  .string()
  .trim()
  .min(1, "You must enter an Office")
  .max(20, "Office cannot exceed 20 characters");

const finalRule = z.object({
  Office: officeFinalRule,
});

export const OrganicSupportRuleFinal = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    OrganicSupport: finalRule,
  }),
  z.object({
    LaborType: z.literal("contractor"),
    // If it is contractor, then populate the OrganicSupport with the default blank values
    OrganicSupport: z
      .object({ Office: z.optional(z.string()) })
      .transform((_obj) => {
        return { ...Labor.OrganicSupport };
      }),
  }),
]);
