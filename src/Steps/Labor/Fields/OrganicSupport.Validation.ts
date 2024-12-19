import { z } from "zod";
import { Labor } from "@api/CAFTOP/defaults";

const officeFinalRule = z
  .string()
  .trim()
  .min(1, "You must enter an Office")
  .max(20, "Office cannot exceed 20 characters");

const finalRule = z.object({
  Office: officeFinalRule,
});

export const OrganicSupportRuleFinal = z
  .object({
    LaborType: z.array(z.string()),
    OrganicSupport: z.object({ Office: z.unknown() }),
  })
  .transform((data, ctx) => {
    if (data.LaborType.includes("organic")) {
      const parseRes = finalRule.safeParse(data.OrganicSupport);
      if (parseRes.error) {
        parseRes.error.errors.forEach((issue) => {
          // Overide the path as the parse doesn't see the Organic SUpport level so must be added in
          const path = ["OrganicSupport", ...issue.path];
          ctx.addIssue({ ...issue, path, fatal: true });
        });
        return z.NEVER; // Don't impact the return type
      }
      return {
        LaborType: data.LaborType,
        OrganicSupport: data.OrganicSupport,
      };
    } else {
      return {
        LaborType: data.LaborType,
        OrganicSupport: { ...Labor.OrganicSupport },
      };
    }
  });
