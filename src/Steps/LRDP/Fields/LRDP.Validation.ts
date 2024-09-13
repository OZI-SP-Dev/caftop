import { z } from "zod";
import { CAFTOPLRDP } from "api/CAFTOP";
import { LRDP as LRDPDefault } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validation";

const lrdpName = z.string().trim().max(50, "Name cannot exceed 50 characters");
const lrdpSeqNumFinal = z
  .string()
  .trim()
  .regex(/^\d{5}$/, "This must be a 5 digits");
const lrdpSeqNumSave = z.union([z.literal(""), lrdpSeqNumFinal]);

const checkForDuplicates = (items: CAFTOPLRDP, ctx: z.RefinementCtx) => {
  const uniqueValuesName = new Map<string, number>();
  const uniqueValuesSeqNum = new Map<string, number>();
  items.LRDP.forEach((item, idx) => {
    const lowerCaseName = item.Name.toLowerCase().trim(); // Make case insensitive and remove spacing
    const firstAppearanceNameIndex = uniqueValuesName.get(lowerCaseName);
    const firstAppearanceSeqNumIndex = uniqueValuesSeqNum.get(item.SeqNum);
    if (firstAppearanceNameIndex !== undefined && lowerCaseName !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Name must be unique`,
        path: ["LRDP", idx, "Name"],
      });
    } else {
      uniqueValuesName.set(lowerCaseName, idx);
    }
    if (firstAppearanceSeqNumIndex !== undefined && item.SeqNum !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Sequence Number must be unique`,
        path: ["LRDP", idx, "SeqNum"],
      });
    } else {
      uniqueValuesSeqNum.set(item.SeqNum, idx);
    }
  });
};

export const lrdpRuleSave = z
  .discriminatedUnion("hasLRDP", [
    z.object({
      hasLRDP: z.enum(["no", ""]),
      LRDP: populateWithDefaultValue(LRDPDefault.LRDP),
    }),
    z.object({
      hasLRDP: z.literal("yes"),
      LRDP: z.array(z.object({ Name: lrdpName, SeqNum: lrdpSeqNumSave })),
    }),
  ])
  .superRefine(checkForDuplicates);

export const lrdpRuleFinal = z
  .discriminatedUnion(
    "hasLRDP",
    [
      z.object({
        hasLRDP: z.enum(["no"]),
        LRDP: populateWithDefaultValue(LRDPDefault.LRDP),
      }),
      z.object({
        hasLRDP: z.literal("yes"),
        LRDP: z
          .array(
            z.object({
              Name: lrdpName.min(1, "You must supply a name"),
              SeqNum: lrdpSeqNumFinal,
            })
          )
          .min(1, "You must have at least one LRDP priority"),
      }),
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
          return {
            message: "You must select whether there are LRDP tasks or not",
          };
        }
        return { message: ctx.defaultError };
      },
    }
  )
  .superRefine(checkForDuplicates);
