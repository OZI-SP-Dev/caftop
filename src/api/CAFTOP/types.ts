import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers.Validation";
import { TechOrderManagersRuleFinal } from "Steps/Info/Fields/TechOrderManagers.Validation";
import { GlobalStateInterface } from "stateManagement/types";
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
  ApprovedWaiver: "yes" | "no" | "";
  ApprovedWaiverDate: Date | null;
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
  ApprovedWaiver: "yes" | "no" | "";
  ApprovedWaiverDate: Date | null;
};

export type CAFTOPImprovements = {
  HasImprovements: "yes" | "no" | "";
  Improvements: { Title: string; Description: string; Impact: string }[];
};

export type CAFTOPLRDP = {
  hasLRDP: "yes" | "no" | "";
  LRDP: { Name: string; SeqNum: string }[];
};

/** Function to determine if the CAFTOP is not Electronic Only (aka has Paper and/or CD/DVD)
 * @param data The CAFTOP data
 * @returns boolean If the CAFTOP has Paper and/or CD/DVD TOs
 */
export const isNotElectronicOnly = (data: GlobalStateInterface) => {
  return (
    (data.TechnicalOrders.NumCDDVD || 0) +
      (data.TechnicalOrders.NumPaper || 0) >
    0
  );
};
