import {
  ContractorSupportRuleFinal,
  ContractorSupportRuleSave,
} from "Steps/Labor/Fields/ContractorSupport.Validation";
import { DescriptionRuleFinal } from "Steps/Description/Fields/Description.Validation";
import { IntroductionRuleFinal } from "Steps/Description/Fields/Introduction.Validation";
import { LaborTypeRuleFinal } from "Steps/Labor/Fields/LaborType.Validation";
import { OrganicSupportRuleFinal } from "Steps/Labor/Fields/OrganicSupport.Validation";
import {
  milstd3048RuleFinal,
  milstd3048RuleSave,
} from "Steps/Labor/Fields/MILSTD3048.Validation";
import {
  tocountsRuleFinal,
  tocountsRuleSave,
} from "Steps/TechnicalOrders/Fields/TOCounts.Validation";
import {
  toapRuleFinal,
  toapRuleSave,
} from "Steps/TechnicalOrders/Fields/TOAPMigration.Validation";
import { CenterRuleFinal } from "Steps/Info/Fields/Center.Validation";
import { LeadCommandRuleFinal } from "Steps/Info/Fields/LeadCommand.Validation";
import { PreparingBaseRuleFinal } from "Steps/Info/Fields/PreparingBase.Validation";
import { PreparingOfficeRuleFinal } from "Steps/Info/Fields/PreparingOffice.Validation";
import { ProgramElementCodeRuleFinal } from "Steps/Info/Fields/ProgramElementCode.Validation";
import { ProgramGroupRuleFinal } from "Steps/Info/Fields/ProgramGroup.Validation";
import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers.Validation";
import { ProgramNameRuleFinal } from "Steps/Info/Fields/ProgramName.Validation";
import { TechOrderManagersRuleFinal } from "Steps/Info/Fields/TechOrderManagers.Validation";
import { CAFTOPInfo, isNotElectronicOnly } from "api/CAFTOP/types";
import { useProgramNamesAndECs } from "api/ProgramNamesAndElementCodes";
import { useContext } from "react";
import { globalContext } from "stateManagement/GlobalStore";
import { GlobalStateInterface } from "stateManagement/types";
import { ZodSchema, z } from "zod";
import {
  configurationplanRuleFinal,
  configurationplanRuleSave,
} from "Steps/Description/Fields/ConfigurationPlan.Validation";
import {
  distcostRuleFinal,
  distcostRuleSave,
} from "Steps/Distribution/Fields/DistCost.Validation";
import { improvementsRuleFinal } from "Steps/Improvements/Fields/Improvements.Validation";
import { additionalLaborRuleFinal } from "Steps/Labor/Fields/AdditionalLabor.Validation";
import {
  systemmissiondescriptionRuleFinal,
  systemmissiondescriptionRuleSave,
} from "Steps/Description/Fields/SystemMissionDescription.Validation";
import {
  dsoRuleFinal,
  dsoRuleNA,
  dsoRuleSave,
} from "Steps/Distribution/Fields/DSO.Validation";
import {
  outsidedsoRuleFinal,
  outsidedsoRuleNA,
  outsidedsoRuleSave,
} from "Steps/Distribution/Fields/OutsideDSO.Validation";
import { lrdpRuleFinal, lrdpRuleSave } from "Steps/LRDP/Fields/LRDP.Validation";
import { useParams } from "react-router-dom";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";

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
    .merge(TechOrderManagersRuleFinal);

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

export const useImprovementsPageValidation = (
  mode?: GlobalStateInterface["mode"]
) => {
  const { globalState } = useContext(globalContext);

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return improvementsRuleFinal;
  } else {
    return improvementsRuleFinal;
  }
};

export const useDistributionPageValidation = (
  notElectronicOnly: boolean,
  mode?: GlobalStateInterface["mode"]
) => {
  const { globalState } = useContext(globalContext);

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
  const { itemId } = useParams();
  const caftop = useCAFTOP(parseInt(itemId ?? "0"), "ALL");
  const notElectronicOnly = caftop.data
    ? isNotElectronicOnly(caftop.data)
    : false;

  const checks = [
    { pageIndex: 0, check: useInfoPageValidation(), data: caftop.data?.Info },
    {
      pageIndex: 1,
      check: useDescriptionPageValidation("submit"),
      data: caftop.data?.Description,
    },
    {
      pageIndex: 2,
      check: useTechnicalOrdersPageValidation("submit"),
      data: caftop.data?.TechnicalOrders,
    },
    {
      pageIndex: 3,
      check: useLaborPageValidation("submit"),
      data: caftop.data?.Labor,
    },
    {
      pageIndex: 4,
      check: useDistributionPageValidation(notElectronicOnly, "submit"),
      data: caftop.data?.Distribution,
    },
    {
      pageIndex: 5,
      check: useImprovementsPageValidation("submit"),
      data: caftop.data?.Improvements,
    },
    {
      pageIndex: 6,
      check: useLRDPPageValidation("submit"),
      data: caftop.data?.LRDP,
    },
  ];

  if (caftop.data && !caftop.isLoading) {
    const errors = [] as CAFTOPError[];
    checks.forEach((item) => {
      const result = item.check.safeParse(item.data);
      if (!result.success) {
        result.error.issues.forEach((issue) =>
          errors.push({ errortext: issue.message, pageIndex: item.pageIndex })
        );
      }
    });
    return errors;
  } else return undefined;
};
