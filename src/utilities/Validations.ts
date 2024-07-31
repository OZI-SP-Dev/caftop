import { LeadCommandRuleFinal } from "Steps/Info/Fields/LeadCommand";
import { PreparingBaseRuleFinal } from "Steps/Info/Fields/PreparingBase";
import { PreparingOfficeRuleFinal } from "Steps/Info/Fields/PreparingOffice";
import { ProgramElementCodeRuleFinal } from "Steps/Info/Fields/ProgramElementCode";
import { ProgramGroupRuleFinal } from "Steps/Info/Fields/ProgramGroup";
import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers";
import { ProgramNameRuleFinal } from "Steps/Info/Fields/ProgramName";
import { TechOrderManagerRuleFinal } from "Steps/Info/Fields/TechOrderManager";
import { useProgramNamesAndECs } from "api/ProgramNamesAndElementCodes";
import { ZodSchema, z } from "zod";

const useAddlPECValidation = (schema: ZodSchema) => {
  const ProgramNamesAndECs = useProgramNamesAndECs();
  return schema.superRefine((data, ctx) => {
    const validPECs: string[] =
      ProgramNamesAndECs.data?.find((item) => item.Title === data.ProgramName)
        ?.PECs ?? [];
    if (!validPECs.includes(data.ProgramElementCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Select a valid PEC for the selected Program Name`,
        path: ["ProgramElementCode"],
      });
    }
  });
};

export const useInfoPageValidation = () => {
  const schema = ProgramGroupRuleFinal.merge(ProgramNameRuleFinal)
    .merge(ProgramElementCodeRuleFinal)
    .merge(LeadCommandRuleFinal)
    .merge(PreparingBaseRuleFinal)
    .merge(PreparingOfficeRuleFinal)
    .merge(ProgramManagersRuleFinal)
    .merge(TechOrderManagerRuleFinal);

  return useAddlPECValidation(schema);
};
