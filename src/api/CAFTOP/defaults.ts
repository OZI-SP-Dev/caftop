import {
  CAFTOPInfo,
  CAFTOPDescription,
  CAFTOPTechnicalOrders,
  CAFTOPDistribution,
  CAFTOPImprovements,
  CAFTOPLabor,
  CAFTOPLRDP,
} from "./types";

export const Info: CAFTOPInfo = {
  ProgramGroup: "",
  ProgramName: "",
  ProgramElementCode: "",
  LeadCommand: "",
  Center: "",
  PreparingBase: "",
  PreparingOffice: "",
  ProgramManagers: [{ FirstName: "", LastName: "", Phone: "", Email: "" }],
  TechOrderManagers: [{ FirstName: "", LastName: "", Phone: "", Email: "" }],
};

export const Description: CAFTOPDescription = {
  Description: "",
  Introduction: "",
  ConfigurationPlan: "",
  SystemMissionDescription: "",
};

export const TechnicalOrders: CAFTOPTechnicalOrders = {
  NumElectronic: "",
  NumPaper: "",
  NumCDDVD: "",
  NumUnpublished: "",
  NumInAcquisition: "",
  AuthoredInTOAPType: "",
  TOApprovedWaiver: "",
  TOApprovedWaiverDate: null,
  NumAuthoredInTOAP: "",
  NumNotAuthoredInTOAP: "",
  NumWillNotBeAuthoredInTOAP: "",
  Explanation: "",
  PlanToConvert: "",
};

export const Labor: CAFTOPLabor = {
  LaborType: "",
  ContractorSupport: {
    LaborCost: "",
    TDSSe: "",
    TDSSeRobins: "",
    ContractorName: "",
    ContractNumber: "",
    ContractExpiration: null,
  },
  OrganicSupport: { Office: "" },
  MILSTD3048Status: "",
  MILSTD3048Location: "",
  MILSTD3048Contractor: "",
  MILSTD3048SourceData: "",
  HasAdditionalLabor: "",
  AdditionalLabor: [],
};

export const Distribution: CAFTOPDistribution = {
  hasDistCost: "",
  DistCost: "",
  hasDSO: "",
  hasOutsideDSO: "",
  ODSOApprovedWaiver: "",
  ODSOApprovedWaiverDate: null,
};

export const Improvements: CAFTOPImprovements = {
  HasImprovements: "",
  Improvements: [],
};

export const LRDP: CAFTOPLRDP = {
  hasLRDP: "",
  LRDP: [],
};
