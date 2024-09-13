import { z } from "zod";
import { Labor } from "stateManagement/reducer";

const titleRule = z.string().trim().min(1, "Title is required");

const descriptionRule = z.string().trim().min(1, "Description is required");

const impactRule = z.string().trim().min(1, "Impact is required");

const additionalLaborDetailsRule = z
  .array(
    z.object({
      Title: titleRule,
      Description: descriptionRule,
      Impact: impactRule,
    })
  )
  .max(10, "No more than 10 Additional Labor items are allowed")
  .min(
    1,
    "At least 1 Additional Labor item must be entered if you selected there is Additional Labor"
  );

export const additionalLaborRuleFinal = z.discriminatedUnion(
  "HasAdditionalLabor",
  [
    z.object({
      HasAdditionalLabor: z.literal("no"),
      AdditionalLabor: z.any().transform((_obj) => Labor.AdditionalLabor),
    }),
    z.object({
      HasAdditionalLabor: z.literal("yes"),
      AdditionalLabor: additionalLaborDetailsRule,
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        return {
          message: "You must select whether there is Additional Labor or not",
        };
      }
      return { message: ctx.defaultError };
    },
  }
);
