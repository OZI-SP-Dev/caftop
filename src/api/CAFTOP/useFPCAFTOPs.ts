import { useQuery, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "../SPWebContext";
import { getCAFTOPs } from "./SampleData";
import { PagedRequest, PagedRequestSP } from "./types";
import { transformFPPagedRequestsFromSP } from "./transform";

declare const _spPageContextInfo: {
  userEmail: string;
};

type pageType = {
  data: PagedRequestSP[];
  pageHref: string | undefined;
  hasMore: boolean;
};

export const PAGESIZE = 3;

interface SortParams {
  sortColumn: string | number | undefined;
  sortDirection: "ascending" | "descending";
}

const defaultSortParams: SortParams = {
  sortColumn: "LeadCommand",
  sortDirection: "ascending",
};

export interface CAFTOPFilter {
  column: string;
  filter: string | Date | number; // | Person;
  modifier?: string;
  queryString: string;
}

const getPagedRequests = async (
  pageHref: string | undefined,
  sortParams: SortParams,
  filterParams: CAFTOPFilter[]
): Promise<pageType> /*: Promise<PagedRequestSP[]>*/ => {
  const requestedFields = [
    "Id",
    "Year",
    "LeadCommand",
    "Center",
    "ProgramElementCode",
    "ProgramGroup",
    "ProgramName",
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

  if (!import.meta.env.DEV) {
    if (!pageHref) {
      const response = await spWebContext.web.lists
        .getByTitle("caftops")
        .renderListDataAsStream(
          {
            ViewXml: `<View>${viewPaging}<Query>${queryString}</Query><ViewFields>${viewFields}</ViewFields></View>`,
          },
          null,
          query
        );

      return {
        data: response.Row,
        pageHref: response.NextHref?.substring(1), // Drop the starting ? from it
        hasMore: !!response.NextHref,
      };
    } else {
      const response = await spWebContext.web.lists
        .getByTitle("caftops")
        .renderListDataAsStream(
          {
            ViewXml: `<View>${viewPaging}<Query>${queryString}</Query><ViewFields>${viewFields}</ViewFields></View>`,
            Paging: pageHref,
          },
          null,
          query
        );
      return {
        data: response.Row,
        pageHref: response.NextHref?.substring(1), // Drop the starting ? from it
        hasMore: !!response.NextHref,
      };
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
      let prevPageHref;

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
        };

        prevPageHref = data?.pageHref;
      }

      return getPagedRequests(prevPageHref, sortParams, filterParams);
    },
    // results must remain cached and not be marked stale, as we have only an iterator
    // to get more pages, which can only move forwards, not backwards
    cacheTime: Infinity,
    staleTime: Infinity,
    select: transformFPPagedRequestsFromSP,
    keepPreviousData: true,
  });
};
