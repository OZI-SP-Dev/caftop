import { z } from "zod";
import { Distribution } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validation";

/** Rule for when the Outside DSO is Not Applicable */
export const outsidedsoRuleNA = z.object({
  hasOutsideDSO: populateWithDefaultValue(Distribution.hasOutsideDSO),
  ODSOApprovedWaiver: populateWithDefaultValue(Distribution.ODSOApprovedWaiver),
  ODSOApprovedWaiverDate: populateWithDefaultValue(
    Distribution.ODSOApprovedWaiverDate
  ),
});

const approvedWaiverUnionSave = z.discriminatedUnion("ODSOApprovedWaiver", [
  z
    .object({
      ODSOApprovedWaiver: z.literal("yes"),
      ODSOApprovedWaiverDate: z.date().or(z.null()),
    })
    .passthrough(),
  z
    .object({
      ODSOApprovedWaiver: z.enum(["", "no"]),
      ODSOApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ODSOApprovedWaiverDate
      ),
    })
    .passthrough(),
]);

const approvedWaiverUnionFinal = z.discriminatedUnion("ODSOApprovedWaiver", [
  z
    .object({
      ODSOApprovedWaiver: z.literal("yes"),
      ODSOApprovedWaiverDate: z.date({
        invalid_type_error: "You must select an Approved Waiver date",
      }),
    })
    .passthrough(),
  z
    .object({
      ODSOApprovedWaiver: z.literal("no"),
      ODSOApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ODSOApprovedWaiverDate
      ),
    })
    .passthrough(),
  z
    .object({
      ODSOApprovedWaiver: z.literal(""),
      ODSOApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ODSOApprovedWaiverDate
      ),
    })
    .passthrough(),
]);

export const outsidedsoRuleSave = z
  .discriminatedUnion("hasOutsideDSO", [
    z.object({
      hasOutsideDSO: z.enum(["no", ""]),
      ODSOApprovedWaiver: populateWithDefaultValue(
        Distribution.ODSOApprovedWaiver
      ),
      ODSOApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ODSOApprovedWaiverDate
      ),
    }),
    z.object({
      hasOutsideDSO: z.enum(["yes"]),
      ODSOApprovedWaiver: z.enum(["yes", "no", ""]),
      ODSOApprovedWaiverDate: z.any(),
    }),
  ])
  .pipe(approvedWaiverUnionSave);

export const outsidedsoRuleFinal = z
  .discriminatedUnion("hasOutsideDSO", [
    z.object({
      hasOutsideDSO: z.enum(["no"]),
      ODSOApprovedWaiver: populateWithDefaultValue(
        Distribution.ODSOApprovedWaiver
      ),
      ODSOApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ODSOApprovedWaiverDate
      ),
    }),
    z.object({
      hasOutsideDSO: z.enum(["yes"]),
      ODSOApprovedWaiver: z.enum(["yes", "no"], {
        message: "You must select whether or not you have an approved waiver",
      }),
      ODSOApprovedWaiverDate: z.any(),
    }),
  ])
  .pipe(approvedWaiverUnionFinal);
