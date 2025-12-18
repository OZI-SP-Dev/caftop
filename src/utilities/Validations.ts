import {
  ContractorSupportRuleFinal,
  ContractorSupportRuleSave,
} from "@steps/Labor/Fields/ContractorSupport.Validation";
import { DescriptionRuleFinal } from "@steps/Description/Fields/Description.Validation";
import { IntroductionRuleFinal } from "@steps/Description/Fields/Introduction.Validation";
import { LaborTypeRuleFinal } from "@steps/Labor/Fields/LaborType.Validation";
import { OrganicSupportRuleFinal } from "@steps/Labor/Fields/OrganicSupport.Validation";
import {
  milstd3048RuleFinal,
  milstd3048RuleSave,
} from "@steps/Labor/Fields/MILSTD3048.Validation";
import {
  tocountsRuleFinal,
  tocountsRuleSave,
} from "@steps/TechnicalOrders/Fields/TOCounts.Validation";
import {
  checkTOCountsForPartiallyMigrated,
  toapRuleFinal,
  toapRuleSave,
} from "@steps/TechnicalOrders/Fields/TOAPMigration.Validation";
import { CenterRuleFinal } from "@steps/Info/Fields/Center.Validation";
import { LeadCommandRuleFinal } from "@steps/Info/Fields/LeadCommand.Validation";
import { PreparingBaseRuleFinal } from "@steps/Info/Fields/PreparingBase.Validation";
import { PreparingOfficeRuleFinal } from "@steps/Info/Fields/PreparingOffice.Validation";
import { ProgramElementCodeRuleFinal } from "@steps/Info/Fields/ProgramElementCode.Validation";
import { ProgramGroupRuleFinal } from "@steps/Info/Fields/ProgramGroup.Validation";
import { ProgramManagersRuleFinal } from "@steps/Info/Fields/ProgramManagers.Validation";
import { ProgramNameRuleFinal } from "@steps/Info/Fields/ProgramName.Validation";
import { TechOrderManagersRuleFinal } from "@steps/Info/Fields/TechOrderManagers.Validation";
import { CAFTOPInfo, isNotElectronicOnly } from "@api/CAFTOP/types";
import { useProgramNamesAndECs } from "@api/ProgramNamesAndElementCodes";
import { useContext } from "react";
import { globalContext } from "@stateManagement/GlobalStore";
import { GlobalStateInterface } from "@stateManagement/types";
import { ZodSchema, z } from "zod";
import {
  configurationplanRuleFinal,
  configurationplanRuleSave,
} from "@steps/Description/Fields/ConfigurationPlan.Validation";
import {
  distcostRuleFinal,
  distcostRuleNA,
  distcostRuleSave,
} from "@steps/Distribution/Fields/DistCost.Validation";
import { improvementsRuleFinal } from "@steps/Improvements/Fields/Improvements.Validation";
import { additionalLaborRuleFinal } from "@steps/Labor/Fields/AdditionalLabor.Validation";
import {
  systemmissiondescriptionRuleFinal,
  systemmissiondescriptionRuleSave,
} from "@steps/Description/Fields/SystemMissionDescription.Validation";
import {
  dsoRuleFinal,
  dsoRuleNA,
  dsoRuleSave,
} from "@steps/Distribution/Fields/DSO.Validation";
import {
  outsidedsoRuleFinal,
  outsidedsoRuleNA,
  outsidedsoRuleSave,
} from "@steps/Distribution/Fields/OutsideDSO.Validation";
import {
  lrdpRuleFinal,
  lrdpRuleSave,
} from "@steps/LRDP/Fields/LRDP.Validation";
import { useParams } from "react-router-dom";
import { useCAFTOP } from "@api/CAFTOP/useCAFTOP";
import {
  toFormatRuleFinal,
  toFormatRuleSave,
} from "@src/Steps/TechnicalOrders/Fields/TOFormat.Validation";

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
        fatal: true,
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
    .merge(TechOrderManagersRuleFinal)
    .merge(z.object({ PMandTOMAandAuthorIds: z.string() }));

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
    return tocountsRuleSave
      .and(toapRuleSave)
      .and(toFormatRuleSave)
      .pipe(checkTOCountsForPartiallyMigrated);
  } else {
    return tocountsRuleFinal
      .and(toapRuleFinal)
      .and(toFormatRuleFinal)
      .pipe(checkTOCountsForPartiallyMigrated);
  }
};

export const useLaborPageValidation = (mode?: GlobalStateInterface["mode"]) => {
  const { globalState } = useContext(globalContext);

  const saveSchema = LaborTypeRuleFinal.and(ContractorSupportRuleSave)
    .and(OrganicSupportRuleFinal)
    .and(additionalLaborRuleFinal)
    .and(milstd3048RuleSave);

  const submitSchema = LaborTypeRuleFinal.and(ContractorSupportRuleFinal)
    .and(OrganicSupportRuleFinal)
    .and(additionalLaborRuleFinal)
    .and(milstd3048RuleFinal);

  const ensureMilStd3048Ctr = (
    data: z.infer<typeof saveSchema> | z.infer<typeof submitSchema>,
    ctx: z.RefinementCtx
  ) => {
    if (
      data.MILSTD3048Status === "current" &&
      data.MILSTD3048Location === "withinOther"
    ) {
      const ctrInList = data.ContractorSupport?.find(
        (item) =>
          item.ContractorName === data.MILSTD3048Contractor &&
          item.TDSSe === "no"
      )
        ? true
        : false;
      if (!ctrInList)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You must select a non TDSSe contract defined in the labor section if 'Within TOAP (utilizing a different contract)'`,
          path: ["MILSTD3048Contractor"],
        });
    }
    if (
      data.MILSTD3048Status === "current" &&
      data.MILSTD3048Location === "withinTDSSe"
    ) {
      const hasTDSSe = data.ContractorSupport?.find(
        (item) => item.TDSSe === "yes"
      )
        ? true
        : false;
      if (!hasTDSSe)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You must have a TDSSe contract added in the labor section to select 'Within TOAP (utilizing the TDSSe contract)'`,
          path: ["MILSTD3048Location"],
        });
    }
  };

  // If we are in save mode OR if we didn't call validation with the "submit" mode
  if (globalState.mode === "save" && mode !== "submit") {
    return saveSchema.superRefine((data, ctx) => {
      ensureMilStd3048Ctr(data, ctx);
    });
  } else {
    return submitSchema.superRefine((data, ctx) => {
      ensureMilStd3048Ctr(data, ctx);
    });
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
    if (notElectronicOnly) {
      return distcostRuleSave.and(dsoRuleSave).and(outsidedsoRuleSave);
    } else {
      return distcostRuleNA.and(dsoRuleNA).and(outsidedsoRuleNA);
    }
  } else {
    if (notElectronicOnly) {
      return distcostRuleFinal.and(dsoRuleFinal).and(outsidedsoRuleFinal);
    } else {
      return distcostRuleNA.and(dsoRuleNA).and(outsidedsoRuleNA);
    }
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
