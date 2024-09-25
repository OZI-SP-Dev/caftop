import { z } from "zod";
import { Improvements } from "api/CAFTOP/defaults";

const titleRule = z.string().trim().min(1, "Title is required");

const descriptionRule = z.string().trim().min(1, "Description is required");

const impactRule = z.string().trim().min(1, "Impact is required");

const improvementsDetailsRule = z
  .array(
    z.object({
      Title: titleRule,
      Description: descriptionRule,
      Impact: impactRule,
    })
  )
  .max(10, "No more than 10 Improvement items are allowed")
  .min(
    1,
    "At least 1 Improvement item must be entered if you selected there are Improvements"
  );

export const improvementsRuleFinal = z.discriminatedUnion(
  "HasImprovements",
  [
    z.object({
      HasImprovements: z.literal("no"),
      Improvements: z.any().transform((_obj) => Improvements.Improvements),
    }),
    z.object({
      HasImprovements: z.literal("yes"),
      Improvements: improvementsDetailsRule,
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        return {
          message: "You must select whether there are Improvements or not",
        };
      }
      return { message: ctx.defaultError };
    },
  }
);
