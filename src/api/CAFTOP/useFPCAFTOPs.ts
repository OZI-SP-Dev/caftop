import { useQuery, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "../SPWebContext";
import { getCAFTOPs } from "./SampleData";
import { PagedRequest, PagedRequestSPStream } from "./types";
import { transformFPPagedRequestsFromSP } from "./transform";
import { IRenderListDataAsStreamResult } from "@pnp/sp/lists/types";

declare const _spPageContextInfo: {
  userEmail: string;
};

type pageType = {
  data: PagedRequestSPStream[];
  carryOverData?: PagedRequestSPStream[]; // Any data from having to do multiple network requests to get PAGESIZE after client filtering
  pageHref: string | undefined;
  hasMore: boolean;
};

export const PAGESIZE = 3;
const CARRYOVER_DATA_ONLY_FLAG = "CARRYOVER_DATA_ONLY";

interface SortParams {
  sortColumn: string | number | undefined;
  sortDirection: "ascending" | "descending";
}

const defaultSortParams: SortParams = {
  sortColumn: "LeadCommand",
  sortDirection: "ascending",
};

export interface CAFTOPFilter {
  column:
    | "LeadCommand"
    | "Center"
    | "ProgramElementCode"
    | "ProgramGroup"
    | "ProgramName"
    | "ProgramManagers"
    | "TechOrderManagers";
  filter: string | Date | number; // | Person;
  modifier?: string;
  queryString: string;
}

const removeNonLastNameMatches = async (
  response: IRenderListDataAsStreamResult,
  viewXMLString: string,
  filterParams: CAFTOPFilter[],
  query: Map<string, string>,
  carryOverData?: PagedRequestSPStream[]
): Promise<pageType> => {
  let results = response.Row as PagedRequestSPStream[];
  let hasMore, pageHref;

  // If we have data that was carried over, then concat it to the start of our results
  if (carryOverData) {
    results = carryOverData.concat(results);
  }

  // If we are filtering by either ProgramManagers or TechOrderManagers -- we need to client side filter to ensure it matches the Last Name
  // Get the search terms
  const pmLastName = filterParams.find(
    (item) => item.column === "ProgramManagers"
  )?.filter;
  const tomaLastName = filterParams.find(
    (item) => item.column === "TechOrderManagers"
  )?.filter;

  // If we are filtering on ProgramManagers then remove any where LastName doesn't match
  if (pmLastName && typeof pmLastName === "string") {
    const re = new RegExp(`"LastName":"[^"]*${pmLastName}[^"]*"`, "gi");
    results = results.filter((item) => {
      {
        return item.ProgramManagers.search(re) !== -1;
      }
    });
  }

  // If we are filtering on TechOrderManagers then remove any where LastName doesn't match
  if (tomaLastName && typeof tomaLastName === "string") {
    const re = new RegExp(`"LastName":"[^"]*${tomaLastName}[^"]*"`, "gi");
    results = results.filter((item) => {
      {
        return item.TechOrderManagers.search(re) !== -1;
      }
    });
  }

  if (results.length < PAGESIZE && !!response.NextHref) {
    // If we haven't reached the PAGESIZE yet, and SharePoint says there are more results
    // Get the additional results from SharePoint
    const newResponse = await spWebContext.web.lists
      .getByTitle("caftops")
      .renderListDataAsStream(
        {
          ViewXml: viewXMLString,
          Paging: response.NextHref.substring(1), // Drop the starting ? from it,
        },
        null,
        query
      );

    // Recursively call
    return await removeNonLastNameMatches(
      newResponse,
      viewXMLString,
      filterParams,
      query,
      results
    );
  }
  // We have either hit the PAGESIZE, or we have no more results
  else {
    if (results.length > PAGESIZE) {
      // If we have more matching results, then splice them off and save for later
      carryOverData = results.splice(PAGESIZE);
    } else {
      carryOverData = undefined;
    }

    if (!!response.NextHref === false && carryOverData) {
      // If SharePoint doesn't have any more results, but we do have some carryOverData
      // then we need to flag it so that the "Next" button is enabled, and we load these carryOverData results
      pageHref = CARRYOVER_DATA_ONLY_FLAG;
      hasMore = true;
    } else {
      pageHref = response.NextHref?.substring(1); // Drop the starting ? from it
      hasMore = !!response.NextHref;
    }

    return {
      data: results,
      carryOverData: carryOverData,
      pageHref: pageHref,
      hasMore: hasMore,
    };
  }
};

const getPagedRequests = async (
  pageHref: string | undefined,
  sortParams: SortParams,
  filterParams: CAFTOPFilter[],
  carryOverData?: PagedRequestSPStream[]
): Promise<pageType> /*: Promise<PagedRequestSP[]>*/ => {
  const requestedFields = [
    "Id",
    "Year",
    "LeadCommand",
    "Center",
    "ProgramElementCode",
    "ProgramGroup",
    "ProgramName",
    "ProgramManagers",
    "TechOrderManagers",
  ];
  let viewFields = "";

  requestedFields.forEach(
    (field) => (viewFields += `<FieldRef Name="${field}" />`)
  );
  const viewPaging = `<RowLimit Paged="TRUE">${PAGESIZE}</RowLimit>`;

  let queryString = "";
  if (filterParams.length > 0) {
    let curFilterIndex = 0;

    // Add any filters they have selected
    filterParams.forEach((filter) => {
      if (++curFilterIndex === 1) {
        queryString = `${filter.queryString}`;
      } else {
        queryString = `<And>${queryString}${filter.queryString}</And>`;
      }
    });
    queryString = `<Where>${queryString}</Where>`;
  }

  // Set the query params using a map
  const query = new Map<string, string>();
  query.set("SortField", `${sortParams.sortColumn?.toString() || "Created"}`);
  query.set(
    "SortDir",
    sortParams.sortDirection !== "descending" ? "Asc" : "Desc"
  );

  const viewXMLString = `<View>${viewPaging}<Query>${queryString}</Query><ViewFields>${viewFields}</ViewFields></View>`;

  if (!import.meta.env.DEV) {
    if (!pageHref) {
      const response = await spWebContext.web.lists
        .getByTitle("caftops")
        .renderListDataAsStream(
          {
            ViewXml: viewXMLString,
          },
          null,
          query
        );

      return await removeNonLastNameMatches(
        response,
        viewXMLString,
        filterParams,
        query
      );
    } else {
      if (pageHref === CARRYOVER_DATA_ONLY_FLAG && carryOverData) {
        return {
          data: carryOverData,
          carryOverData: undefined,
          pageHref: undefined,
          hasMore: false,
        };
      } else {
        const response = await spWebContext.web.lists
          .getByTitle("caftops")
          .renderListDataAsStream(
            {
              ViewXml: viewXMLString,
              Paging: pageHref,
            },
            null,
            query
          );

        return await removeNonLastNameMatches(
          response,
          viewXMLString,
          filterParams,
          query,
          carryOverData
        );
      }
    }
  } else {
    return new Promise((resolve) =>
      setTimeout(() => resolve(getCAFTOPs() as unknown as pageType), 1000)
    );
  }
};

export const usePagedRequests = (
  page = 0,
  sortParams = defaultSortParams,
  filterParams: CAFTOPFilter[]
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["paged-requests", sortParams, filterParams, page],
    queryFn: () => {
      let prevPageHref, carryOverData;

      if (page > 0) {
        const data = queryClient.getQueryData([
          "paged-requests",
          sortParams,
          filterParams,
          page - 1,
        ]) as {
          data: PagedRequest[];
          pageHref: string | undefined;
          hasMore: boolean;
          carryOverData: PagedRequestSPStream[];
        };

        prevPageHref = data?.pageHref;
        carryOverData = data?.carryOverData;
      }

      return getPagedRequests(
        prevPageHref,
        sortParams,
        filterParams,
        carryOverData
      );
    },
    // results must remain cached and not be marked stale, as we have only an iterator
    // to get more pages, which can only move forwards, not backwards
    cacheTime: Infinity,
    staleTime: Infinity,
    select: transformFPPagedRequestsFromSP,
    keepPreviousData: true,
  });
};
