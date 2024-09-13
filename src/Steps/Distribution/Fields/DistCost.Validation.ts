import { z } from "zod";
import { Distribution } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validation";

const distcostBaseRule = z.union([
  z.literal(""),
  z.coerce
    .number()
    .positive("Distribution Cost must be greater than zero")
    .safe()
    .step(1, "Distribution Cost must be a whole dollar value"),
]);

export const distcostRuleSave = z.discriminatedUnion("hasDistCost", [
  z.object({
    hasDistCost: z.enum(["no", ""]),
    DistCost: populateWithDefaultValue(Distribution.DistCost),
  }),
  z.object({
    hasDistCost: z.literal("yes"),
    DistCost: distcostBaseRule,
  }),
]);

export const distcostRuleFinal = z.discriminatedUnion(
  "hasDistCost",
  [
    z.object({
      hasDistCost: z.enum(["no"]),
      DistCost: populateWithDefaultValue(Distribution.DistCost),
    }),
    z.object({
      hasDistCost: z.literal("yes"),
      DistCost: distcostBaseRule.pipe(
        z.number({
          invalid_type_error: "Distribution Cost must be greater than zero",
        })
      ),
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        return {
          message:
            "You must select whether there are Distribution Costs or not",
        };
      }
      return { message: ctx.defaultError };
    },
  }
);
