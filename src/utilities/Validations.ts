import {
  ContractorSupportRuleFinal,
  ContractorSupportRuleSave,
} from "Steps/Labor/Fields/ContractorSupport";
import { DescriptionRuleFinal } from "Steps/Description/Fields/Description";
import { IntroductionRuleFinal } from "Steps/Description/Fields/Introduction";
import { LaborTypeRuleFinal } from "Steps/Labor/Fields/LaborType";
import { OrganicSupportRuleFinal } from "Steps/Labor/Fields/OrganicSupport";
import {
  milstd3048RuleFinal,
  milstd3048RuleSave,
} from "Steps/Labor/Fields/MILSTD3048";
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
import { CAFTOPInfo, isNotElectronicOnly } from "api/CAFTOP";
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
import {
  dsoRuleFinal,
  dsoRuleNA,
  dsoRuleSave,
} from "Steps/Distribution/Fields/DSO";
import {
  outsidedsoRuleFinal,
  outsidedsoRuleNA,
  outsidedsoRuleSave,
} from "Steps/Distribution/Fields/OutsideDSO";
import { lrdpRuleFinal, lrdpRuleSave } from "Steps/LRDP/Fields/LRDP";

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
      .and(additionalLaborRuleFinal)
      .and(milstd3048RuleSave);
  } else {
    return LaborTypeRuleFinal.and(ContractorSupportRuleFinal)
      .and(OrganicSupportRuleFinal)
      .and(additionalLaborRuleFinal)
      .and(milstd3048RuleFinal);
  }
};

export const useDistributionPageValidation = (
  mode?: GlobalStateInterface["mode"]
) => {
  const { globalState } = useContext(globalContext);
  const notElectronicOnly = isNotElectronicOnly(globalState);

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return distcostRuleSave
      .and(notElectronicOnly ? dsoRuleSave : dsoRuleNA)
      .and(notElectronicOnly ? outsidedsoRuleSave : outsidedsoRuleNA);
  } else {
    return distcostRuleFinal
      .and(notElectronicOnly ? dsoRuleFinal : dsoRuleNA)
      .and(notElectronicOnly ? outsidedsoRuleFinal : outsidedsoRuleNA);
  }
};

export const useLRDPPageValidation = (mode?: GlobalStateInterface["mode"]) => {
  const { globalState } = useContext(globalContext);

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return lrdpRuleSave;
  } else {
    return lrdpRuleFinal;
  }
};

interface CAFTOPError {
  errortext: string;
  pageIndex: number;
}

export const useCheckComplete = () => {
  const errors = [] as CAFTOPError[];
  const { globalState } = useContext(globalContext);
  const checks = [
    { pageIndex: 1, check: useInfoPageValidation(), data: globalState.Info },
    {
      pageIndex: 2,
      check: useDescriptionPageValidation("submit"),
      data: globalState.Description,
    },
    {
      pageIndex: 3,
      check: useTechnicalOrdersPageValidation("submit"),
      data: globalState.TechnicalOrders,
    },
    {
      pageIndex: 4,
      check: useLaborPageValidation("submit"),
      data: globalState.Labor,
    },
    {
      pageIndex: 5,
      check: useDistributionPageValidation("submit"),
      data: globalState.Distribution,
    },
    {
      pageIndex: 8,
      check: useLRDPPageValidation("submit"),
      data: globalState.LRDP,
    },
  ];

  checks.forEach((item) => {
    const result = item.check.safeParse(item.data);
    if (!result.success) {
      result.error.issues.forEach((issue) =>
        errors.push({ errortext: issue.message, pageIndex: item.pageIndex })
      );
    }
  });

  return errors;
};
