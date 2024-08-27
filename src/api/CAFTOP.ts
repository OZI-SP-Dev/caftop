import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers";
import { TechOrderManagerRuleFinal } from "Steps/Info/Fields/TechOrderManager";
import { z } from "zod";

// Generate the type definition from the Zod rules
type ProgramManagers = z.infer<typeof ProgramManagersRuleFinal>;
type TechOrderManager = z.infer<typeof TechOrderManagerRuleFinal>;

export type CAFTOPInfo = {
  ProgramGroup: string;
  ProgramName: string;
  ProgramElementCode: string;
  LeadCommand: string;
  Center: string;
  PreparingBase: string;
  PreparingOffice: string;
} & ProgramManagers &
  TechOrderManager;

export type CAFTOPDescription = {
  Description: string;
  Introduction: string;
  ConfigurationPlan: string;
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
  HasAdditionalLabor: "yes" | "no" | "";
  AdditionalLabor: { Title: string; Description: string; Impact: string }[];
};

export type CAFTOPDistribution = {
  hasDistCost: "yes" | "no" | "";
  DistCost: number | "";
};
