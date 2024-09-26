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
  NumCDDVD: "",
  NumPaper: "",
};

export const Improvements: CAFTOPImprovements = {
  HasImprovements: "",
  Improvements: [],
};

export const LRDP: CAFTOPLRDP = {
  hasLRDP: "",
  LRDP: [],
};

export const getFieldsForPage = (page: string) => {
  let pageObj;
  switch (page) {
    // This isn't a "page" in the tool -- but is the value of the highest page/step reached
    case "MaxStep":
      pageObj = { wizardMaxStep: 0 };
      break;
    case "Info":
      pageObj = Info;
      break;
    case "Description":
      pageObj = Description;
      break;
    case "TechnicalOrders":
      pageObj = TechnicalOrders;
      break;
    case "Labor":
      pageObj = Labor;
      break;
    case "Distribution":
      pageObj = Distribution;
      break;
    case "Improvements":
      pageObj = Improvements;
      break;
    case "LRDP":
      pageObj = LRDP;
      break;
    case "ALL":
      pageObj = {
        ...Info,
        ...Description,
        ...TechnicalOrders,
        ...Labor,
        ...Distribution,
        ...Improvements,
        ...LRDP,
      };
  }

  return pageObj ? Object.keys(pageObj).join(",") : "";
};
