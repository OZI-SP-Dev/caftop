import { z } from "zod";
import { Labor } from "@api/CAFTOP/defaults";
import { populateWithDefaultValue } from "@utilities/Validation";

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
  .max(100, "Contractor Name cannot exceed 100 characters");

const tdsseCtr =
  "AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)";

const tdsseBaseRule = z.discriminatedUnion("TDSSe", [
  z.object({
    TDSSe: z.literal(""),
    TDSSeRobins: populateWithDefaultValue(
      Labor.ContractorSupport[0].TDSSeRobins
    ),
    ContractorName: populateWithDefaultValue(
      Labor.ContractorSupport[0].TDSSeRobins
    ),
  }),
  z.object({
    TDSSe: z.literal("yes"),
    TDSSeRobins: z.enum(["yes", "no", ""]),
    ContractorName: populateWithDefaultValue(tdsseCtr),
  }),
  z.object({
    TDSSe: z.literal("no"),
    TDSSeRobins: populateWithDefaultValue(
      Labor.ContractorSupport[0].TDSSeRobins
    ),
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
        Labor.ContractorSupport[0].TDSSeRobins
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

export const ContractorSupportRuleSave = z
  .object({
    LaborType: z.array(z.string()),
    ContractorSupport: z.array(z.unknown()),
  })
  .transform((data, ctx) => {
    if (data.LaborType.includes("contractor")) {
      const parseRes = z
        .array(saveRule.and(tdsseBaseRule))
        .safeParse(data.ContractorSupport);
      if (parseRes.error) {
        parseRes.error.errors.forEach((issue) => {
          // Override the path as the safeParse doesn't see the "ContractorSupport" level
          const path = ["ContractorSupport", ...issue.path];
          ctx.addIssue({ ...issue, path });
        });
        return z.NEVER; // Don't impact the return type
      }
      return {
        LaborType: data.LaborType,
        ContractorSupport: parseRes.data,
      };
    } else {
      return {
        LaborType: data.LaborType,
        ContractorSupport: [],
      };
    }
  });

export const ContractorSupportRuleFinal = z
  .object({
    LaborType: z.array(z.string()),
    ContractorSupport: z.array(z.unknown()),
  })
  .transform((data, ctx) => {
    if (data.LaborType.includes("contractor")) {
      const parseRes = z
        .array(finalRule.and(tdsseFinalRule))
        .safeParse(data.ContractorSupport);
      if (parseRes.error) {
        parseRes.error.errors.forEach((issue) => {
          // Override the path as the safeParse doesn't see the "ContractorSupport" level
          const path = ["ContractorSupport", ...issue.path];
          ctx.addIssue({ ...issue, path });
        });
        return z.NEVER; // Don't impact the return type
      }
      return {
        LaborType: data.LaborType,
        ContractorSupport: parseRes.data,
      };
    } else {
      return {
        LaborType: data.LaborType,
        ContractorSupport: [],
      };
    }
  });
