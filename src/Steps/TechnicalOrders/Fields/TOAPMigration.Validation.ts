import { z } from "zod";
import { TechnicalOrders } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validation";

const numberRulesSave = (fieldName: string) => {
  return z.union([
    z.literal(""),
    z.coerce
      .number()
      .int(`Number of ${fieldName} must be a whole number`)
      .gte(0, `Number of ${fieldName} must be greater than or equal to zero`)
      .safe(),
  ]);
};

const numberRulesFinal = (fieldName: string) => {
  return numberRulesSave(fieldName).pipe(
    z.number({
      invalid_type_error: `Number of ${fieldName} must be greater than or equal to zero`,
    })
  );
};

const blankApprovedWaiver = z.object({
  ApprovedWaiver: populateWithDefaultValue(TechnicalOrders.ApprovedWaiver),
  ApprovedWaiverDate: populateWithDefaultValue(
    TechnicalOrders.ApprovedWaiverDate
  ),
});

const blankTOCounts = z.object({
  NumAuthoredInTOAP: populateWithDefaultValue(
    TechnicalOrders.NumAuthoredInTOAP
  ),
  NumNotAuthoredInTOAP: populateWithDefaultValue(
    TechnicalOrders.NumNotAuthoredInTOAP
  ),
  NumWillNotBeAuthoredInTOAP: populateWithDefaultValue(
    TechnicalOrders.NumWillNotBeAuthoredInTOAP
  ),
});

const blankTOPlanToConvert = z.object({
  PlanToConvert: populateWithDefaultValue(TechnicalOrders.PlanToConvert),
});

const blankTOExplanation = z.object({
  Explanation: populateWithDefaultValue(TechnicalOrders.Explanation),
});

const planToCovertRuleBase = z.string().trim();
const planToCovertRuleSave = z.object({
  PlanToConvert: planToCovertRuleBase,
});
const planToCovertRuleFinal = z.object({
  PlanToConvert: planToCovertRuleBase.min(
    1,
    "You must enter the Plans to Convert"
  ),
});

const toapFullyAuthoredRuleFinal = z
  .object({
    AuthoredInTOAPType: z.literal("fully"),
  })
  .merge(blankApprovedWaiver)
  .merge(blankTOCounts)
  .merge(blankTOExplanation)
  .merge(blankTOPlanToConvert);

const approvedWaiverUnionSave = z.discriminatedUnion("ApprovedWaiver", [
  z
    .object({
      ApprovedWaiver: z.literal("yes"),
      ApprovedWaiverDate: z.date().or(z.null()),
    })
    .passthrough(),
  z
    .object({
      ApprovedWaiver: z.enum(["", "no"]),
      ApprovedWaiverDate: populateWithDefaultValue(
        TechnicalOrders.ApprovedWaiverDate
      ),
    })
    .passthrough(),
]);

const approvedWaiverUnionFinal = z.discriminatedUnion("ApprovedWaiver", [
  z
    .object({
      ApprovedWaiver: z.literal("yes"),
      ApprovedWaiverDate: z.date({
        invalid_type_error: "You must select an Approved Waiver date",
      }),
    })
    .passthrough(),
  z
    .object({
      ApprovedWaiver: z.literal("no"),
      ApprovedWaiverDate: populateWithDefaultValue(
        TechnicalOrders.ApprovedWaiverDate
      ),
    })
    .passthrough(),
  z
    .object({
      ApprovedWaiver: z.literal(""),
      ApprovedWaiverDate: populateWithDefaultValue(
        TechnicalOrders.ApprovedWaiverDate
      ),
    })
    .passthrough(),
]);

const approvedWaiverSave = z.object({
  ApprovedWaiver: z.enum(["yes", "no", ""]),
  ApprovedWaiverDate: z.any(),
});

const approvedWaiverFinal = z.object({
  ApprovedWaiver: z.enum(["yes", "no"], {
    message: "You must select whether there is an approved waiver",
  }),
  ApprovedWaiverDate: z.any(),
});

export const toapRuleSave = z
  .discriminatedUnion(
    "AuthoredInTOAPType",
    [
      toapFullyAuthoredRuleFinal.merge(
        z.object({ AuthoredInTOAPType: z.literal("") }) // Overwrite the "fully" check wiht ""
      ),
      toapFullyAuthoredRuleFinal,
      z
        .object({
          AuthoredInTOAPType: z.literal("partially"),
          NumAuthoredInTOAP: numberRulesSave("TOs authored in TOAP"),
          NumNotAuthoredInTOAP: numberRulesSave(
            "TOs to be authored in TOAP through attrition"
          ),
          NumWillNotBeAuthoredInTOAP: numberRulesSave(
            "TOs currently not planned for TOAP"
          ),
          Explanation: z.any(),
        })
        .merge(approvedWaiverSave)
        .merge(blankTOPlanToConvert),
      z
        .object({
          AuthoredInTOAPType: z.literal("no"),
        })
        .merge(approvedWaiverSave)
        .merge(blankTOCounts)
        .merge(blankTOExplanation)
        .merge(planToCovertRuleSave),
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
          return {
            message:
              "You must select how Technical Orders (TOs) are authored in TOAP",
          };
        }
        return { message: ctx.defaultError };
      },
    }
  )
  .transform((obj) => {
    // Can't do a discrimator on this one since it doesn't support numbers - so handle it after other validations
    if (obj.AuthoredInTOAPType === "partially") {
      if (obj.NumWillNotBeAuthoredInTOAP === 0) {
        // If it is zero, then TOExplanation is made blank
        return { ...obj, Explanation: TechnicalOrders.Explanation };
      }
    }
    return obj;
  })
  .pipe(approvedWaiverUnionSave);

export const toapRuleFinal = z
  .discriminatedUnion(
    "AuthoredInTOAPType",
    [
      toapFullyAuthoredRuleFinal,
      z
        .object({
          AuthoredInTOAPType: z.literal("partially"),
          NumAuthoredInTOAP: numberRulesFinal("TOs authored in TOAP"),
          NumNotAuthoredInTOAP: numberRulesFinal(
            "TOs to be authored in TOAP through attrition"
          ),
          NumWillNotBeAuthoredInTOAP: numberRulesFinal(
            "TOs currently not planned for TOAP"
          ),
          Explanation: z.any(),
        })
        .merge(approvedWaiverFinal),
      z
        .object({
          AuthoredInTOAPType: z.literal("no"),
        })
        .merge(approvedWaiverFinal)
        .merge(blankTOCounts)
        .merge(blankTOExplanation)
        .merge(planToCovertRuleFinal),
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
          return {
            message:
              "You must select how Technical Orders (TOs) are authored in TOAP",
          };
        }
        return { message: ctx.defaultError };
      },
    }
  )
  .transform((obj, ctx) => {
    // Can't do a discrimator on this one since it doesn't support numbers - so handle it after other validations
    if (obj.AuthoredInTOAPType === "partially") {
      if (
        obj.NumWillNotBeAuthoredInTOAP !== 0 &&
        (obj.Explanation === "" || obj.Explanation === undefined)
      ) {
        ctx.addIssue({
          message:
            "Explanation of why the TOs will not be authored in TOAP is required",
          path: ["Explanation"],
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: false,
        });
      } else if (obj.NumWillNotBeAuthoredInTOAP === 0) {
        // If it is zero, then TOExplanation is made blank
        return { ...obj, Explanation: TechnicalOrders.Explanation };
      }
    }
    return obj;
  })
  .pipe(approvedWaiverUnionFinal);
