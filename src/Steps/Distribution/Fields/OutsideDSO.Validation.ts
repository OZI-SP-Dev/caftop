import { z } from "zod";
import { Distribution } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validation";

/** Rule for when the Outside DSO is Not Applicable */
export const outsidedsoRuleNA = z.object({
  hasOutsideDSO: populateWithDefaultValue(Distribution.hasOutsideDSO),
  ApprovedWaiver: populateWithDefaultValue(Distribution.ApprovedWaiver),
  ApprovedWaiverDate: populateWithDefaultValue(Distribution.ApprovedWaiverDate),
});

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
        Distribution.ApprovedWaiverDate
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
        Distribution.ApprovedWaiverDate
      ),
    })
    .passthrough(),
  z
    .object({
      ApprovedWaiver: z.literal(""),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    })
    .passthrough(),
]);

export const outsidedsoRuleSave = z
  .discriminatedUnion("hasOutsideDSO", [
    z.object({
      hasOutsideDSO: z.enum(["no", ""]),
      ApprovedWaiver: populateWithDefaultValue(Distribution.ApprovedWaiver),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    }),
    z.object({
      hasOutsideDSO: z.enum(["yes"]),
      ApprovedWaiver: z.enum(["yes", "no", ""]),
      ApprovedWaiverDate: z.any(),
    }),
  ])
  .pipe(approvedWaiverUnionSave);

export const outsidedsoRuleFinal = z
  .discriminatedUnion("hasOutsideDSO", [
    z.object({
      hasOutsideDSO: z.enum(["no"]),
      ApprovedWaiver: populateWithDefaultValue(Distribution.ApprovedWaiver),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    }),
    z.object({
      hasOutsideDSO: z.enum(["yes"]),
      ApprovedWaiver: z.enum(["yes", "no"], {
        message: "You must select whether or not you have an approved waiver",
      }),
      ApprovedWaiverDate: z.any(),
    }),
  ])
  .pipe(approvedWaiverUnionFinal);
