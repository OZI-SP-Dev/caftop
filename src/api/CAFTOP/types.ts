import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers.Validation";
import { TechOrderManagersRuleFinal } from "Steps/Info/Fields/TechOrderManagers.Validation";
import { z } from "zod";

// Generate the type definition from the Zod rules
type ProgramManagers = z.infer<typeof ProgramManagersRuleFinal>;
type TechOrderManagers = z.infer<typeof TechOrderManagersRuleFinal>;

export type CAFTOPInfo = {
  ProgramGroup: string;
  ProgramName: string;
  ProgramElementCode: string;
  LeadCommand: string;
  Center: string;
  PreparingBase: string;
  PreparingOffice: string;
} & ProgramManagers &
  TechOrderManagers;

export type CAFTOPDescription = {
  Description: string;
  Introduction: string;
  ConfigurationPlan: string;
  SystemMissionDescription: string;
};

export type CAFTOPTechnicalOrders = {
  NumElectronic: number | "";
  NumPaper: number | "";
  NumCDDVD: number | "";
  NumUnpublished: number | "";
  NumInAcquisition: number | "";
  AuthoredInTOAPType: "fully" | "partially" | "no" | "";
  TOApprovedWaiver: "yes" | "no" | "";
  TOApprovedWaiverDate: Date | null;
  NumAuthoredInTOAP: number | "";
  NumNotAuthoredInTOAP: number | "";
  NumWillNotBeAuthoredInTOAP: number | "";
  Explanation: string;
  PlanToConvert: string;
};

export type CAFTOPLabor = {
  LaborType: "contractor" | "organic" | "";
  ContractorSupport: {
    LaborCost: string;
    TDSSe: "yes" | "no" | "";
    TDSSeRobins: "yes" | "no" | "";
    ContractorName: string;
    ContractNumber: string;
    ContractExpiration: Date | null;
  };
  OrganicSupport: { Office: string };
  MILSTD3048Status: "current" | "plan" | "noplan" | "";
  MILSTD3048Location: "withinTDSSe" | "withinOther" | "outside" | "";
  MILSTD3048Contractor: string;
  MILSTD3048SourceData: string;
  HasAdditionalLabor: "yes" | "no" | "";
  AdditionalLabor: { Title: string; Description: string; Impact: string }[];
};

export type CAFTOPDistribution = {
  hasDistCost: "yes" | "no" | "";
  DistCost: number | "";
  hasDSO: "yes" | "no" | "";
  hasOutsideDSO: "yes" | "no" | "";
  ODSOApprovedWaiver: "yes" | "no" | "";
  ODSOApprovedWaiverDate: Date | null;
  NumPaper: number | ""; // We also get these fields from the 'TechnicalOrders'
  NumCDDVD: number | ""; // section to determine if electronic only
};

export type CAFTOPImprovements = {
  HasImprovements: "yes" | "no" | "";
  Improvements: { Title: string; Description: string; Impact: string }[];
};

export type CAFTOPLRDP = {
  hasLRDP: "yes" | "no" | "";
  LRDP: { Name: string; SeqNum: string }[];
};

export type CAFTOPMaxStep = { wizardMaxStep: number };

export type CAFTOP = {
  Info: CAFTOPInfo;
  Description: CAFTOPDescription;
  TechnicalOrders: CAFTOPTechnicalOrders;
  Labor: CAFTOPLabor;
  Distribution: CAFTOPDistribution;
  Improvements: CAFTOPImprovements;
  LRDP: CAFTOPLRDP;
};

export type CAFTOPPage =
  | CAFTOPInfo
  | CAFTOPDescription
  | CAFTOPTechnicalOrders
  | CAFTOPLabor
  | CAFTOPDistribution
  | CAFTOPImprovements
  | CAFTOPLRDP;

export type Pages =
  | "Info"
  | "Description"
  | "TechnicalOrders"
  | "Labor"
  | "Distribution"
  | "Improvements"
  | "LRDP"
  | "ALL"
  | "MaxStep"
  | "Completed";

export type PageType<T> = T extends "Info"
  ? CAFTOPInfo
  : T extends "Description"
  ? CAFTOPDescription
  : T extends "TechnicalOrders"
  ? CAFTOPTechnicalOrders
  : T extends "Labor"
  ? CAFTOPLabor
  : T extends "Distribution"
  ? CAFTOPDistribution
  : T extends "Improvements"
  ? CAFTOPImprovements
  : T extends "LRDP"
  ? CAFTOPLRDP
  : T extends "ALL"
  ? CAFTOP
  : T extends "MaxStep"
  ? CAFTOPMaxStep
  : never;

export type CAFTOPSPInfo = {
  // This info is all required to create a CAFTOP, so we can assume it won't be null on SP
  ProgramGroup: string;
  ProgramName: string;
  ProgramElementCode: string;
  LeadCommand: string;
  Center: string;
  PreparingBase: string;
  PreparingOffice: string;
  ProgramManagers: string;
  TechOrderManagers: string;
};

export type CAFTOPSPDescription = {
  Description: string | null;
  Introduction: string | null;
  ConfigurationPlan: string | null;
  SystemMissionDescription: string | null;
};

export type CAFTOPSPTechnicalOrders = {
  NumElectronic: number | null;
  NumPaper: number | null;
  NumCDDVD: number | null;
  NumUnpublished: number | null;
  NumInAcquisition: number | null;
  AuthoredInTOAPType: string | null;
  TOApprovedWaiver: string | null;
  TOApprovedWaiverDate: string | null;
  NumAuthoredInTOAP: number | null;
  NumNotAuthoredInTOAP: number | null;
  NumWillNotBeAuthoredInTOAP: number | null;
  Explanation: string | null;
  PlanToConvert: string | null;
};

export type CAFTOPSPLabor = {
  LaborType: string | null;
  ContractorSupport: string | null;
  OrganicSupport: string | null;
  MILSTD3048Status: string | null;
  MILSTD3048Location: string | null;
  MILSTD3048Contractor: string | null;
  MILSTD3048SourceData: string | null;
  HasAdditionalLabor: string | null;
  AdditionalLabor: string | null;
};

export type CAFTOPSPDistribution = {
  hasDistCost: string | null;
  DistCost: number | null;
  hasDSO: string | null;
  hasOutsideDSO: string | null;
  ODSOApprovedWaiver: string | null;
  ODSOApprovedWaiverDate: string | null;
  NumPaper: number | null; // We also get these fields from the 'TechnicalOrders'
  NumCDDVD: number | null; // section to determine if electronic only
};

export type CAFTOPSPImprovements = {
  HasImprovements: string | null;
  Improvements: string | null;
};

export type CAFTOPSPLRDP = {
  hasLRDP: string | null;
  LRDP: string | null;
};

export type CAFTOPSPMaxStep = CAFTOPMaxStep; // We assign the max step -- so it won't be null like the others could be

export type CAFTOPSP = CAFTOPSPInfo &
  CAFTOPSPDescription &
  CAFTOPSPTechnicalOrders &
  CAFTOPSPLabor &
  CAFTOPSPDistribution &
  CAFTOPSPImprovements &
  CAFTOPSPLRDP &
  CAFTOPSPMaxStep;

export type CAFTOPSPPage =
  | CAFTOPSPInfo
  | CAFTOPSPDescription
  | CAFTOPSPTechnicalOrders
  | CAFTOPSPLabor
  | CAFTOPSPDistribution
  | CAFTOPSPImprovements
  | CAFTOPSPLRDP
  | CAFTOPSPMaxStep;

export type PageTypeSP<T> = T extends "Info"
  ? CAFTOPSPInfo
  : T extends "Description"
  ? CAFTOPSPDescription
  : T extends "TechnicalOrders"
  ? CAFTOPSPTechnicalOrders
  : T extends "Labor"
  ? CAFTOPSPLabor
  : T extends "Distribution"
  ? CAFTOPSPDistribution
  : T extends "Improvements"
  ? CAFTOPSPImprovements
  : T extends "LRDP"
  ? CAFTOPSPLRDP
  : T extends "ALL"
  ? CAFTOPSP
  : T extends "MaxStep"
  ? CAFTOPSPMaxStep
  : never;

/** Function to determine if the CAFTOP is not Electronic Only (aka has Paper and/or CD/DVD)
 * @param data The CAFTOP data
 * @returns boolean If the CAFTOP has Paper and/or CD/DVD TOs
 */
export const isNotElectronicOnly = (caftop: CAFTOP | CAFTOPDistribution) => {
  if ("Distribution" in caftop) {
    // If we are of type CAFTOP
    return (
      (caftop.Distribution.NumCDDVD || 0) +
        (caftop.Distribution.NumPaper || 0) >
      0
    );
  } else {
    // We are of type CAFTOPDistribution
    return (caftop.NumCDDVD || 0) + (caftop.NumPaper || 0) > 0;
  }
};
