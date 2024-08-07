import {
  ContractorSupportRuleFinal,
  ContractorSupportRuleSave,
} from "Steps/Description/Fields/ContractorSupport";
import { DescriptionRuleFinal } from "Steps/Description/Fields/Description";
import { IntroductionRuleFinal } from "Steps/Description/Fields/Introduction";
import { LaborTypeRuleFinal } from "Steps/Description/Fields/LaborType";
import {
  OfficeRuleFinal,
  OfficeRuleSave,
} from "Steps/Description/Fields/OrganicSupport";
import { CenterRuleFinal } from "Steps/Info/Fields/Center";
import { LeadCommandRuleFinal } from "Steps/Info/Fields/LeadCommand";
import { PreparingBaseRuleFinal } from "Steps/Info/Fields/PreparingBase";
import { PreparingOfficeRuleFinal } from "Steps/Info/Fields/PreparingOffice";
import { ProgramElementCodeRuleFinal } from "Steps/Info/Fields/ProgramElementCode";
import { ProgramGroupRuleFinal } from "Steps/Info/Fields/ProgramGroup";
import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers";
import { ProgramNameRuleFinal } from "Steps/Info/Fields/ProgramName";
import { TechOrderManagerRuleFinal } from "Steps/Info/Fields/TechOrderManager";
import { CAFTOPInfo } from "api/CAFTOP";
import { useProgramNamesAndECs } from "api/ProgramNamesAndElementCodes";
import { useContext } from "react";
import { globalContext } from "stateManagement/GlobalStore";
import { GlobalStateInterface } from "stateManagement/types";
import { ZodSchema, z } from "zod";

const useAddlPECValidation = (schema: ZodSchema<CAFTOPInfo>) => {
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
    .merge(CenterRuleFinal)
    .merge(PreparingBaseRuleFinal)
    .merge(PreparingOfficeRuleFinal)
    .merge(ProgramManagersRuleFinal)
    .merge(TechOrderManagerRuleFinal);

  return useAddlPECValidation(schema);
};

export const useDescriptionPageValidation = (
  mode?: GlobalStateInterface["mode"]
) => {
  const { globalState } = useContext(globalContext);

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return DescriptionRuleFinal.merge(IntroductionRuleFinal)
      .merge(LaborTypeRuleFinal)
      .and(ContractorSupportRuleSave)
      .and(OfficeRuleSave);
  } else {
    return DescriptionRuleFinal.merge(IntroductionRuleFinal)
      .merge(LaborTypeRuleFinal)
      .and(ContractorSupportRuleFinal)
      .and(OfficeRuleFinal);
  }
};

interface CAFTOPError {
  errortext: string;
  pageIndex: number;
}

export const useCheckComplete = () => {
  const errors = [] as CAFTOPError[];
  const { globalState } = useContext(globalContext);
  const info = useInfoPageValidation();
  const description = useDescriptionPageValidation("submit");

  const result1 = info.safeParse(globalState.Info);
  if (!result1.success) {
    result1.error.issues.forEach((issue) =>
      errors.push({ errortext: issue.message, pageIndex: 1 })
    );
  }

  const result2 = description.safeParse(globalState.Description);
  if (!result2.success) {
    result2.error.issues.forEach((issue) =>
      errors.push({ errortext: issue.message, pageIndex: 2 })
    );
  }

  return errors;
};
