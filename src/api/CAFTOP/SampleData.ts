import { CAFTOPSP, PagedRequestSP } from "./types";

const caftopSamples: CAFTOPSP[] = [
  {
    ProgramGroup: "330 TACTICAL AIRLIFT CSG",
    ProgramName: "A010",
    ProgramElementCode: "78202D",
    LeadCommand: "AETC",
    Center: "AFMRA",
    PreparingBase: "Wright Patterson AFB, OH",
    PreparingOffice: "AFLCMC/XP-OZ",
    ProgramManagers:
      '[{"FirstName":"BARB","LastName":"AKEW","Phone":"(312) 257-1111","Email":"barb.akew@us.af.mil"}]',
    TechOrderManagers:
      '[{"FirstName":"BARB","LastName":"AKEW","Phone":"(312) 257-1111","Email":"barb.akew@us.af.mil"}]',
    Description: "I have this description",
    Introduction:
      "The overall health of A010 Technical Orders (TOs) is good. All  TOs are in digital format Portable Document Format (PDF) and available in the Enhanced Technical Information Management System (ETIMS).",
    ConfigurationPlan: "This is a sample Configuration Plan.",
    SystemMissionDescription:
      "Here is a sample for the System/Mission Description.",
    NumElectronic: 1,
    NumPaper: 2,
    NumCDDVD: 3,
    NumUnpublished: 4,
    NumInAcquisition: 5,
    TOApprovedWaiver: "yes",
    TOApprovedWaiverDate: "2024-09-17T04:00:00.000Z",
    AuthoredInTOAPType: "partially",
    NumAuthoredInTOAP: 6,
    NumNotAuthoredInTOAP: 7,
    NumWillNotBeAuthoredInTOAP: 8,
    Explanation:
      "Here is an explanation of why the TOs will not be authored in TOAP, identifying the constraints, justification and list the plan of action.",
    PlanToConvert: "",
    LaborType: "contractor",
    ContractorSupport:
      '{"LaborCost":5,"ContractNumber":"FA8124-24-D-0003","ContractExpiration":"2024-12-31T05:00:00.000Z","TDSSe":"yes","TDSSeRobins":"yes","ContractorName":"AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)"}',
    OrganicSupport: '{"Office": "" }',
    HasAdditionalLabor: "yes",
    AdditionalLabor:
      '[{"Title":"Extra labor","Description":"There is some extra labor that needs pefromed.","Impact":"If this is not performed, then it will cause significant delays."}]',
    MILSTD3048Location: "withinTDSSe",
    MILSTD3048Contractor:
      "AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)",
    MILSTD3048SourceData: "",
    MILSTD3048Status: "current",
    hasDistCost: "no",
    DistCost: null,
    hasDSO: "yes",
    ODSOApprovedWaiver: "",
    ODSOApprovedWaiverDate: "",
    hasOutsideDSO: "no",
    hasLRDP: "yes",
    LRDP: '[{"Name":"Labor","SeqNum":"12345"},{"Name":"Distribution","SeqNum":"54321"}]',
    wizardMaxStep: 7,
    HasImprovements: "yes",
    Improvements:
      '[{"Title":"Title","Description":"Description","Impact":"Impact"},{"Title":"Number 2","Description":"Desc 2","Impact":"Impact 2"}]',
    Year: 2027,
    Created: "2024-09-18T15:54:18Z",
    PMandTOMAandAuthorIds: '"1",',
  },
  {
    ProgramGroup: "330 TACTICAL AIRLIFT CSG",
    ProgramName: "A010",
    ProgramElementCode: "78202D",
    LeadCommand: "AFMC",
    Center: "AFLCMC",
    PreparingBase: "Wright Patterson AFB, OH",
    PreparingOffice: "AFLCMC/XP-OZ 2",
    ProgramManagers:
      '[{"FirstName":"BARB","LastName":"AKEW","Phone":"(312) 257-1111","Email":"barb.akew@us.af.mil"}]',
    TechOrderManagers:
      '[{"FirstName":"BARB","LastName":"AKEW","Phone":"(312) 257-1111","Email":"barb.akew@us.af.mil"}]',
    Description: "I have this description, as the second item",
    Introduction:
      "The overall health of A010 Technical Orders (TOs) is good. All  TOs are in digital format Portable Document Format (PDF) and available in the Enhanced Technical Information Management System (ETIMS).",
    ConfigurationPlan: "This is a sample Configuration Plan.",
    SystemMissionDescription:
      "Here is a sample for the System/Mission Description.",
    NumElectronic: 1,
    NumPaper: 2,
    NumCDDVD: 3,
    NumUnpublished: 4,
    NumInAcquisition: 5,
    TOApprovedWaiver: "yes",
    TOApprovedWaiverDate: "2024-09-17T04:00:00.000Z",
    AuthoredInTOAPType: "partially",
    NumAuthoredInTOAP: 6,
    NumNotAuthoredInTOAP: 7,
    NumWillNotBeAuthoredInTOAP: 8,
    Explanation:
      "Here is an explanation of why the TOs will not be authored in TOAP, identifying the constraints, justification and list the plan of action. This is for second item",
    PlanToConvert: "",
    LaborType: "contractor",
    ContractorSupport:
      '{"LaborCost":5,"ContractNumber":"FA8124-24-D-0003","ContractExpiration":"2024-12-31T05:00:00.000Z","TDSSe":"yes","TDSSeRobins":"yes","ContractorName":"AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)"}',
    OrganicSupport: '{"Office": "" }',
    HasAdditionalLabor: "yes",
    AdditionalLabor:
      '[{"Title":"Extra labor","Description":"There is some extra labor that needs pefromed.","Impact":"If this is not performed, then it will cause significant delays."}]',
    MILSTD3048Location: "withinTDSSe",
    MILSTD3048Contractor:
      "AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)",
    MILSTD3048SourceData: "",
    MILSTD3048Status: "current",
    hasDistCost: "no",
    DistCost: null,
    hasDSO: "yes",
    ODSOApprovedWaiver: "",
    ODSOApprovedWaiverDate: "",
    hasOutsideDSO: "no",
    hasLRDP: "yes",
    LRDP: '[{"Name":"Labor","SeqNum":"12345"},{"Name":"Distribution","SeqNum":"54321"}]',
    wizardMaxStep: 7,
    HasImprovements: "yes",
    Improvements:
      '[{"Title":"Title","Description":"Description","Impact":"Second CAFTOP"},{"Title":"Number 2","Description":"Desc 2","Impact":"Impact 2"}]',
    Year: 2027,
    Created: "2024-09-18T15:54:18Z",
    PMandTOMAandAuthorIds: '"1",',
  },
];

const blankData: CAFTOPSP = {
  ProgramGroup: "",
  ProgramName: "",
  ProgramElementCode: "",
  LeadCommand: "",
  Center: "",
  PreparingBase: "",
  PreparingOffice: "",
  ProgramManagers: "",
  TechOrderManagers: "",
  Description: null,
  Introduction: null,
  ConfigurationPlan: null,
  SystemMissionDescription: null,
  NumElectronic: null,
  NumPaper: null,
  NumCDDVD: null,
  NumUnpublished: null,
  NumInAcquisition: null,
  TOApprovedWaiver: null,
  TOApprovedWaiverDate: null,
  AuthoredInTOAPType: null,
  NumAuthoredInTOAP: null,
  NumNotAuthoredInTOAP: null,
  NumWillNotBeAuthoredInTOAP: null,
  Explanation: null,
  PlanToConvert: null,
  LaborType: null,
  ContractorSupport: null,
  OrganicSupport: null,
  HasAdditionalLabor: null,
  AdditionalLabor: null,
  MILSTD3048Location: null,
  MILSTD3048Contractor: null,
  MILSTD3048SourceData: null,
  MILSTD3048Status: null,
  hasDistCost: null,
  DistCost: null,
  hasDSO: null,
  ODSOApprovedWaiver: null,
  ODSOApprovedWaiverDate: null,
  hasOutsideDSO: null,
  hasLRDP: null,
  LRDP: null,
  wizardMaxStep: 1,
  HasImprovements: null,
  Improvements: null,
  Year: 0,
  Created: "",
  PMandTOMAandAuthorIds: "",
};

// https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
const pick = <T extends object, K extends keyof T>(obj: T, ...keys: K[]) =>
  Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]])
  ) as Pick<T, K>;

//** Function to simulate the "select" api from SharePoint to just get particular fields */
export const getCAFTOPFields = (id: number, fields: string) => {
  const fieldsArray = fields.split(",") as (keyof CAFTOPSP)[];
  const record = caftopSamples[id - 1];

  return pick(record, ...fieldsArray);
};

//** Function to simulate the update api from SharePoint to just get particular fields */
export const updateCAFTOPFields = (id: number, data: Partial<CAFTOPSP>) => {
  // Be "bad" and mutate the object
  caftopSamples[id - 1] = { ...caftopSamples[id - 1], ...data };
};

//** Function to simulate the create api from SharePoint to just get particular fields */
export const createCAFTOP = (data: Partial<CAFTOPSP>) => {
  // Be "bad" and mutate the object
  caftopSamples[caftopSamples.length] = { ...blankData, ...data };
  return { Id: caftopSamples.length };
};

export const getCAFTOPs = () => {
  const caftops: PagedRequestSP[] = [];
  let index = 1;
  caftopSamples.forEach((caftop) => {
    caftops.push({
      Id: index++,
      Year: caftop.Year,
      LeadCommand: caftop.LeadCommand,
      Center: caftop.Center,
      ProgramElementCode: caftop.ProgramElementCode,
      ProgramGroup: caftop.ProgramGroup,
      ProgramName: caftop.ProgramName,
    });
  });
  return {
    data: caftops,
    iterator: {},
    hasMore: false,
  };
};
