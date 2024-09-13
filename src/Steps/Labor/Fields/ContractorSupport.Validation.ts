import { z } from "zod";
import { Labor } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validation";

const laborCostBaseRule = z.union([
  z.literal(""),
  z.coerce
    .number()
    .nonnegative()
    .safe()
    .step(1, "Labor Cost must be a whole dollar value"),
]);

const contractornameBaseRule = z
  .string()
  .trim()
  .max(50, "Contractor Name cannot exceed 50 characters");

const tdsseCtr =
  "AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)";

const tdsseBaseRule = z.discriminatedUnion("TDSSe", [
  z.object({
    TDSSe: z.literal(""),
    TDSSeRobins: populateWithDefaultValue(Labor.ContractorSupport.TDSSeRobins),
    ContractorName: populateWithDefaultValue(
      Labor.ContractorSupport.TDSSeRobins
    ),
  }),
  z.object({
    TDSSe: z.literal("yes"),
    TDSSeRobins: z.enum(["yes", "no", ""]),
    ContractorName: populateWithDefaultValue(tdsseCtr),
  }),
  z.object({
    TDSSe: z.literal("no"),
    TDSSeRobins: populateWithDefaultValue(Labor.ContractorSupport.TDSSeRobins),
    ContractorName: contractornameBaseRule,
  }),
]);

const tdsseFinalRule = z.discriminatedUnion(
  "TDSSe",
  [
    z.object({
      TDSSe: z.literal("yes"),
      TDSSeRobins: z.enum(["yes", "no"], {
        message: "You must select if this is Robins Home Office or not",
      }),
      ContractorName: populateWithDefaultValue(tdsseCtr),
    }),
    z.object({
      TDSSe: z.literal("no"),
      TDSSeRobins: populateWithDefaultValue(
        Labor.ContractorSupport.TDSSeRobins
      ),
      ContractorName: contractornameBaseRule.min(
        1,
        "You must supply a Contractor Name"
      ),
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        return {
          message: "You must select whether this is TDSSe or not",
        };
      }
      return { message: ctx.defaultError };
    },
  }
);

const contractnumberBaseRule = z
  .string()
  .trim()
  .max(20, "Contract Number cannot exceed 20 characters");

const contractexpirationBaseRule = z.date().or(z.null());

const saveRule = z.object({
  LaborCost: laborCostBaseRule,
  ContractNumber: contractnumberBaseRule,
  ContractExpiration: contractexpirationBaseRule,
});

const finalRule = z.object({
  LaborCost: laborCostBaseRule.pipe(
    z.number({
      invalid_type_error: "Labor Cost must be greater than or equal to 0",
    })
  ),
  ContractNumber: contractnumberBaseRule.min(
    1,
    "You must enter a Contract Number"
  ),
  ContractExpiration: z.date({
    // If it is "null" then override the error message with one letting them know they need to select
    invalid_type_error: "You must select a date for Contract Expiration",
  }),
});

export const ContractorSupportRuleSave = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    // If we are organic, then populate the ContractoSupport with the default blank values
    ContractorSupport: populateWithDefaultValue({
      ...Labor.ContractorSupport,
    }),
  }),
  z.object({
    LaborType: z.literal("contractor"),
    ContractorSupport: saveRule.and(tdsseBaseRule),
  }),
]);

export const ContractorSupportRuleFinal = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    // If we are organic, then populate the ContractoSupport with the default blank values
    ContractorSupport: populateWithDefaultValue({
      ...Labor.ContractorSupport,
    }),
  }),
  z.object({
    LaborType: z.literal("contractor"),
    ContractorSupport: finalRule.and(tdsseFinalRule),
  }),
]);
