import {
  ContractorSupportRuleFinal,
  ContractorSupportRuleSave,
} from "Steps/Labor/Fields/ContractorSupport";
import { DescriptionRuleFinal } from "Steps/Description/Fields/Description";
import { IntroductionRuleFinal } from "Steps/Description/Fields/Introduction";
import { LaborTypeRuleFinal } from "Steps/Labor/Fields/LaborType";
import { OrganicSupportRuleFinal } from "Steps/Labor/Fields/OrganicSupport";
import {
  tocountsRuleFinal,
  tocountsRuleSave,
} from "Steps/TechnicalOrders/Fields/TOCounts";
import {
  toapRuleFinal,
  toapRuleSave,
} from "Steps/TechnicalOrders/Fields/TOAPMigration";
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
import {
  configurationplanRuleFinal,
  configurationplanRuleSave,
} from "Steps/Description/Fields/ConfigurationPlan";
import {
  distcostRuleFinal,
  distcostRuleSave,
} from "Steps/Distribution/Fields/DistCost";
import { additionalLaborRuleFinal } from "Steps/Labor/Fields/AdditionalLabor";
import {
  systemmissiondescriptionRuleFinal,
  systemmissiondescriptionRuleSave,
} from "Steps/Description/Fields/SystemMissionDescription";

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
    return DescriptionRuleFinal.merge(IntroductionRuleFinal).and(
      configurationplanRuleSave.and(systemmissiondescriptionRuleSave)
    );
  } else {
    return DescriptionRuleFinal.merge(IntroductionRuleFinal).and(
      configurationplanRuleFinal.and(systemmissiondescriptionRuleFinal)
    );
  }
};

export const useTechnicalOrdersPageValidation = (
  mode?: GlobalStateInterface["mode"]
) => {
  const { globalState } = useContext(globalContext);

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return tocountsRuleSave.and(toapRuleSave);
  } else {
    return tocountsRuleFinal.and(toapRuleFinal);
  }
};

export const useLaborPageValidation = (mode?: GlobalStateInterface["mode"]) => {
  const { globalState } = useContext(globalContext);

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return LaborTypeRuleFinal.and(ContractorSupportRuleSave)
      .and(OrganicSupportRuleFinal)
      .and(additionalLaborRuleFinal);
  } else {
    return LaborTypeRuleFinal.and(ContractorSupportRuleFinal)
      .and(OrganicSupportRuleFinal)
      .and(additionalLaborRuleFinal);
  }
};

export const useDistributionPageValidation = (
  mode?: GlobalStateInterface["mode"]
) => {
  const { globalState } = useContext(globalContext);

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return distcostRuleSave;
  } else {
    return distcostRuleFinal;
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
  const technicalorders = useTechnicalOrdersPageValidation("submit");
  const labor = useLaborPageValidation("submit");
  const distribution = useDistributionPageValidation("submit");

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

  const result3 = technicalorders.safeParse(globalState.TechnicalOrders);
  if (!result3.success) {
    result3.error.issues.forEach((issue) =>
      errors.push({ errortext: issue.message, pageIndex: 3 })
    );
  }

  const result4 = labor.safeParse(globalState.Labor);
  if (!result4.success) {
    result4.error.issues.forEach((issue) =>
      errors.push({ errortext: issue.message, pageIndex: 4 })
    );
  }

  const result5 = distribution.safeParse(globalState.Distribution);
  if (!result5.success) {
    result5.error.issues.forEach((issue) =>
      errors.push({ errortext: issue.message, pageIndex: 5 })
    );
  }

  return errors;
};
