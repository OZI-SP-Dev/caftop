import { Improvements, LRDP, Labor } from "api/CAFTOP/defaults";
import {
  PageType,
  Pages,
  CAFTOPLRDP,
  CAFTOPInfo,
  CAFTOPImprovements,
  CAFTOPLabor,
  PageTypeSP,
  CAFTOPSPInfo,
  CAFTOPSPDescription,
  CAFTOPDescription,
  CAFTOPSPTechnicalOrders,
  CAFTOPTechnicalOrders,
  CAFTOPSPLabor,
  CAFTOPSPDistribution,
  CAFTOPDistribution,
  CAFTOPSPImprovements,
  CAFTOPSPLRDP,
  CAFTOPMaxStep,
  PagedRequestSP,
  PagedRequest,
  PagedRequestSPStream,
} from "./types";
import { spWebContext } from "api/SPWebContext";
import { getCurrentUser } from "api/UserApi";

const transformInfoFromSP = (data: CAFTOPSPInfo) => {
  const info: CAFTOPInfo = {
    ProgramGroup: data.ProgramGroup ?? "",
    ProgramName: data.ProgramName ?? "",
    ProgramElementCode: data.ProgramElementCode ?? "",
    LeadCommand: data.LeadCommand ?? "",
    Center: data.Center ?? "",
    PreparingBase: data.PreparingBase ?? "",
    PreparingOffice: data.PreparingOffice ?? "",
    ProgramManagers: JSON.parse(
      data.ProgramManagers
    ) as CAFTOPInfo["ProgramManagers"],
    TechOrderManagers: JSON.parse(
      data.TechOrderManagers
    ) as CAFTOPInfo["TechOrderManagers"],
    PMandTOMAandAuthorIds: data.PMandTOMAandAuthorIds ?? "",
  };
  return info;
};

const transformDescriptionFromSP = (data: CAFTOPSPDescription) => {
  const desc: CAFTOPDescription = {
    Description: data.Description ?? "",
    Introduction: data.Introduction ?? "",
    ConfigurationPlan: data.ConfigurationPlan ?? "",
    SystemMissionDescription: data.SystemMissionDescription ?? "",
  };
  return desc;
};

const transformTechnicalOrdersFromSP = (data: CAFTOPSPTechnicalOrders) => {
  const techOrder: CAFTOPTechnicalOrders = {
    NumElectronic: data.NumElectronic ?? "",
    NumPaper: data.NumPaper ?? "",
    NumCDDVD: data.NumCDDVD ?? "",
    NumUnpublished: data.NumUnpublished ?? "",
    NumInAcquisition: data.NumInAcquisition ?? "",
    TOApprovedWaiver: (data.TOApprovedWaiver ??
      "") as CAFTOPTechnicalOrders["TOApprovedWaiver"],
    TOApprovedWaiverDate: data.TOApprovedWaiverDate
      ? new Date(data.TOApprovedWaiverDate)
      : null,
    AuthoredInTOAPType: (data.AuthoredInTOAPType ??
      "") as CAFTOPTechnicalOrders["AuthoredInTOAPType"],
    NumAuthoredInTOAP: data.NumAuthoredInTOAP ?? "",
    NumNotAuthoredInTOAP: data.NumNotAuthoredInTOAP ?? "",
    NumWillNotBeAuthoredInTOAP: data.NumWillNotBeAuthoredInTOAP ?? "",
    Explanation: data.Explanation ?? "",
    PlanToConvert: data.PlanToConvert ?? "",
  };
  return techOrder;
};

const transformLaborFromSP = (data: CAFTOPSPLabor) => {
  const transformCtrSupport = () => {
    if (data.ContractorSupport !== null && data.ContractorSupport !== "") {
      const ctrSupport = JSON.parse(
        data.ContractorSupport
      ) as CAFTOPLabor["ContractorSupport"];

      ctrSupport.ContractExpiration = ctrSupport.ContractExpiration
        ? new Date(ctrSupport.ContractExpiration)
        : null;

      return ctrSupport;
    }
    return Labor.ContractorSupport;
  };

  const labor: CAFTOPLabor = {
    LaborType: (data.LaborType ?? "") as CAFTOPLabor["LaborType"],
    ContractorSupport: transformCtrSupport(),
    OrganicSupport:
      data.OrganicSupport !== null && data.OrganicSupport !== ""
        ? (JSON.parse(data.OrganicSupport) as CAFTOPLabor["OrganicSupport"])
        : Labor.OrganicSupport,
    HasAdditionalLabor: (data.HasAdditionalLabor ??
      "") as CAFTOPLabor["HasAdditionalLabor"],
    AdditionalLabor:
      data.AdditionalLabor !== null && data.AdditionalLabor !== ""
        ? (JSON.parse(data.AdditionalLabor) as CAFTOPLabor["AdditionalLabor"])
        : Labor.AdditionalLabor,
    MILSTD3048Location: (data.MILSTD3048Location ??
      "") as CAFTOPLabor["MILSTD3048Location"],
    MILSTD3048Contractor: data.MILSTD3048Contractor ?? "",
    MILSTD3048SourceData: data.MILSTD3048SourceData ?? "",
    MILSTD3048Status: (data.MILSTD3048Status ??
      "") as CAFTOPLabor["MILSTD3048Status"],
  };
  return labor;
};

const transformDistributionFromSP = (data: CAFTOPSPDistribution) => {
  const distr: CAFTOPDistribution = {
    hasDistCost: (data.hasDistCost ?? "") as CAFTOPDistribution["hasDistCost"],
    DistCost: data.DistCost ?? "",
    hasDSO: (data.hasDSO ?? "") as CAFTOPDistribution["hasDSO"],
    ODSOApprovedWaiver: (data.ODSOApprovedWaiver ??
      "") as CAFTOPDistribution["ODSOApprovedWaiver"],
    ODSOApprovedWaiverDate: data.ODSOApprovedWaiverDate
      ? new Date(data.ODSOApprovedWaiverDate)
      : null,
    hasOutsideDSO: (data.hasOutsideDSO ??
      "") as CAFTOPDistribution["hasOutsideDSO"],
    NumPaper: data.NumPaper ?? "",
    NumCDDVD: data.NumCDDVD ?? "",
  };
  return distr;
};

const transformImprovementsFromSP = (data: CAFTOPSPImprovements) => {
  const improv: CAFTOPImprovements = {
    HasImprovements: (data.HasImprovements ??
      "") as CAFTOPImprovements["HasImprovements"],
    Improvements:
      data.Improvements !== null && data.Improvements !== ""
        ? (JSON.parse(data.Improvements) as CAFTOPImprovements["Improvements"])
        : Improvements.Improvements,
  };
  return improv;
};

const transformLRDPFromSP = (data: CAFTOPSPLRDP) => {
  const lrdp: CAFTOPLRDP = {
    hasLRDP: (data.hasLRDP ?? "") as CAFTOPLRDP["hasLRDP"],
    LRDP:
      data.LRDP !== null && data.LRDP !== ""
        ? (JSON.parse(data.LRDP) as CAFTOPLRDP["LRDP"])
        : LRDP.LRDP,
  };
  return lrdp;
};

export const transformRequestFromSP = <T extends Pages>(
  request: PageTypeSP<T>,
  page: T
): PageType<T> => {
  switch (page) {
    case "Info":
      return transformInfoFromSP(request as CAFTOPSPInfo) as PageType<T>;
    case "Description":
      return transformDescriptionFromSP(
        request as CAFTOPSPDescription
      ) as PageType<T>;
    case "TechnicalOrders":
      return transformTechnicalOrdersFromSP(
        request as CAFTOPSPTechnicalOrders
      ) as PageType<T>;
    case "Labor":
      return transformLaborFromSP(request as CAFTOPSPLabor) as PageType<T>;
    case "Distribution":
      return transformDistributionFromSP(
        request as CAFTOPSPDistribution
      ) as PageType<T>;
    case "Improvements":
      return transformImprovementsFromSP(
        request as CAFTOPSPImprovements
      ) as PageType<T>;
    case "LRDP":
      return transformLRDPFromSP(request as CAFTOPSPLRDP) as PageType<T>;
    case "ALL": {
      return {
        Info: transformInfoFromSP(request as CAFTOPSPInfo),
        Description: transformDescriptionFromSP(request as CAFTOPSPDescription),
        TechnicalOrders: transformTechnicalOrdersFromSP(
          request as CAFTOPSPTechnicalOrders
        ),
        Labor: transformLaborFromSP(request as CAFTOPSPLabor),
        Distribution: transformDistributionFromSP(
          request as CAFTOPSPDistribution
        ),
        Improvements: transformImprovementsFromSP(
          request as CAFTOPSPImprovements
        ),
        LRDP: transformLRDPFromSP(request as CAFTOPSPLRDP),
        Year: (
          request as {
            Year: number;
          }
        ).Year,
        Created: new Date(
          (
            request as {
              Created: string;
            }
          ).Created
        ),
      } as PageType<T>;
    }
    case "MaxStep":
      return {
        wizardMaxStep: (<CAFTOPMaxStep>request).wizardMaxStep,
      } as PageType<T>;
  }

  return {} as never;
};

// If a number is "" then we make it null -- previous check was checking truthy and zeros were becoming null
const transformNumToSP = (number: number | "") => {
  return typeof number === "number" ? number : null;
};

const transformInfoToSP = async (data: CAFTOPInfo) => {
  let ids = "";

  // Get the Ids for all the Program Managers (PMs)
  for (const item of data.ProgramManagers) {
    try {
      const id = (await spWebContext.web.ensureUser(item.Email)).Id.toString();
      ids += `"${id}",`;
    } catch (e) {
      /* Ignore failures that are just beause the email isn't in GAL */
    }
  }

  // Get the Ids for all the Technical Order Managers (TOMAs)
  for (const item of data.TechOrderManagers) {
    try {
      const id = (await spWebContext.web.ensureUser(item.Email)).Id.toString();
      ids += `"${id}",`;
    } catch (e) {
      /* Ignore failures that are just beause the email isn't in GAL */
    }
  }

  let authorId = data.PMandTOMAandAuthorIds.split(",")?.pop() ?? ""; // Get the last item of the array as it is the author
  if (authorId === "") {
    // If this is a brand new request then get current user as author
    authorId = `"${getCurrentUser().Id.toString()}"`;
  }
  ids += `${authorId},`; // Add the AuthorId to the string of PMs and TOMAs

  const info: CAFTOPSPInfo = {
    ProgramGroup: data.ProgramGroup,
    ProgramName: data.ProgramName,
    ProgramElementCode: data.ProgramElementCode,
    LeadCommand: data.LeadCommand,
    Center: data.Center,
    PreparingBase: data.PreparingBase,
    PreparingOffice: data.PreparingOffice,
    ProgramManagers: JSON.stringify(data.ProgramManagers),
    TechOrderManagers: JSON.stringify(data.TechOrderManagers),
    PMandTOMAandAuthorIds: ids,
  };
  return info;
};

const transformDescriptionToSP = (data: CAFTOPDescription) => {
  const desc: CAFTOPSPDescription = {
    Description: data.Description,
    Introduction: data.Introduction,
    ConfigurationPlan: data.ConfigurationPlan,
    SystemMissionDescription: data.SystemMissionDescription,
  };
  return desc;
};

const transformTechnicalOrdersToSP = (data: CAFTOPTechnicalOrders) => {
  const techOrder: CAFTOPSPTechnicalOrders = {
    NumElectronic: transformNumToSP(data.NumElectronic),
    NumPaper: transformNumToSP(data.NumPaper),
    NumCDDVD: transformNumToSP(data.NumCDDVD),
    NumUnpublished: transformNumToSP(data.NumUnpublished),
    NumInAcquisition: transformNumToSP(data.NumInAcquisition),
    TOApprovedWaiver: data.TOApprovedWaiver,
    TOApprovedWaiverDate: data.TOApprovedWaiverDate?.toISOString() ?? null,
    AuthoredInTOAPType: data.AuthoredInTOAPType,
    NumAuthoredInTOAP: transformNumToSP(data.NumAuthoredInTOAP),
    NumNotAuthoredInTOAP: transformNumToSP(data.NumNotAuthoredInTOAP),
    NumWillNotBeAuthoredInTOAP: transformNumToSP(
      data.NumWillNotBeAuthoredInTOAP
    ),
    Explanation: data.Explanation ?? "",
    PlanToConvert: data.PlanToConvert ?? "",
  };
  return techOrder;
};

const transformLaborToSP = (data: CAFTOPLabor) => {
  const labor: CAFTOPSPLabor = {
    LaborType: data.LaborType,
    ContractorSupport: JSON.stringify(data.ContractorSupport),
    OrganicSupport: JSON.stringify(data.OrganicSupport),
    HasAdditionalLabor: data.HasAdditionalLabor,
    AdditionalLabor: JSON.stringify(data.AdditionalLabor),
    MILSTD3048Location: data.MILSTD3048Location,
    MILSTD3048Contractor: data.MILSTD3048Contractor,
    MILSTD3048SourceData: data.MILSTD3048SourceData,
    MILSTD3048Status: data.MILSTD3048Status,
  };
  return labor;
};

const transformDistributionToSP = (data: CAFTOPDistribution) => {
  const distr: CAFTOPSPDistribution = {
    hasDistCost: data.hasDistCost,
    DistCost: transformNumToSP(data.DistCost),
    hasDSO: data.hasDSO,
    ODSOApprovedWaiver: data.ODSOApprovedWaiver,
    ODSOApprovedWaiverDate: data.ODSOApprovedWaiverDate?.toISOString() ?? null,
    hasOutsideDSO: data.hasOutsideDSO,
    NumPaper: transformNumToSP(data.NumPaper),
    NumCDDVD: transformNumToSP(data.NumCDDVD),
  };

  // We don't want to update NumPaper and NumCDDVD
  const { NumPaper, NumCDDVD, ...rest } = distr;
  return rest;
};

const transformImprovementsToSP = (data: CAFTOPImprovements) => {
  const improv: CAFTOPSPImprovements = {
    HasImprovements: data.HasImprovements,
    Improvements: JSON.stringify(data.Improvements),
  };
  return improv;
};

const transformLRDPToSP = (data: CAFTOPLRDP) => {
  const lrdp: CAFTOPSPLRDP = {
    hasLRDP: data.hasLRDP,
    LRDP: JSON.stringify(data.LRDP),
  };
  return lrdp;
};

/**
 * Directly map the incoming request to the IRequestItem to perform type
 * conversions and drop SharePoint added data that is not needed, and
 * will cause update errors.
 *
 * Convert Date objects to strings
 * Convert "" numbers to null
 */

export const transformRequestToSP = async <T extends Pages>(
  request: PageType<T>,
  page: T
): Promise<PageTypeSP<T>> => {
  //const retVal = structuredClone({ ...request }) as Partial<CAFTOPSP>;

  switch (page) {
    case "Info":
      return transformInfoToSP(request as CAFTOPInfo) as Promise<PageTypeSP<T>>;
    case "Description":
      return transformDescriptionToSP(
        request as CAFTOPDescription
      ) as PageTypeSP<T>;
    case "TechnicalOrders":
      return transformTechnicalOrdersToSP(
        request as CAFTOPTechnicalOrders
      ) as PageTypeSP<T>;
    case "Labor":
      return transformLaborToSP(request as CAFTOPLabor) as PageTypeSP<T>;
    case "Distribution":
      return transformDistributionToSP(
        request as CAFTOPDistribution
      ) as PageTypeSP<T>;
    case "Improvements":
      return transformImprovementsToSP(
        request as CAFTOPImprovements
      ) as PageTypeSP<T>;
    case "LRDP":
      return transformLRDPToSP(request as CAFTOPLRDP) as PageTypeSP<T>;
    case "MaxStep":
      return {
        wizardMaxStep: (<CAFTOPMaxStep>request).wizardMaxStep,
      } as PageTypeSP<T>;
  }

  return {} as never;
};

export const transformPagedRequestsFromSP = (requests: {
  data: PagedRequestSP[];
  iterator: AsyncIterator<PagedRequestSP[]>;
  hasMore: boolean;
}) => {
  const returnObject: PagedRequest[] = [];

  requests?.data?.forEach((request) => {
    returnObject.push({
      Id: request.Id,
      Year: request.Year,
      LeadCommand: request.LeadCommand,
      Center: request.Center,
      ProgramElementCode: request.ProgramElementCode,
      ProgramGroup: request.ProgramGroup,
      ProgramName: request.ProgramName,
    });
  });

  return {
    data: returnObject,
    hasMore: requests.hasMore,
  };
};

export const transformFPPagedRequestsFromSP = (requests: {
  data: PagedRequestSPStream[];
  pageHref: string | undefined;
  hasMore: boolean;
}) => {
  const returnObject: PagedRequest[] = [];

  requests?.data?.forEach((request) => {
    returnObject.push({
      Id: request.ID,
      Year: request.Year,
      LeadCommand: request.LeadCommand,
      Center: request.Center,
      ProgramElementCode: request.ProgramElementCode,
      ProgramGroup: request.ProgramGroup,
      ProgramName: request.ProgramName,
    });
  });

  return {
    data: returnObject,
    hasMore: requests.hasMore,
  };
};
