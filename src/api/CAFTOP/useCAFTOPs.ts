import { useQuery, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "../SPWebContext";
import { getCAFTOPs } from "./SampleData";
import { PagedRequestSP, PagedRequest } from "./types";
import { transformPagedRequestsFromSP } from "./transform";
import { getCurrentUser } from "api/UserApi";

declare const _spPageContextInfo: {
  userEmail: string;
};

type pageType = {
  data: PagedRequestSP[];
  iterator: AsyncIterator<PagedRequestSP[]>;
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
  pageIterator: AsyncIterator<PagedRequestSP[]> | undefined,
  sortParams: SortParams,
  filterParams: CAFTOPFilter[]
): Promise<pageType> /*: Promise<PagedRequestSP[]>*/ => {
  const requestedFields =
    "Id,Year,LeadCommand,Center,ProgramElementCode,ProgramGroup,ProgramName";

  const { Id: currentUserId } = getCurrentUser();
  // They should see only ones where they are the Author, PM, or TOMA
  let queryString = `substringof('"${currentUserId}"',PMandTOMAandAuthorIds)`;

  // Add any filters they have selected
  filterParams.forEach((filter) => {
    queryString += ` and ${filter.queryString}`;
  });

  if (!import.meta.env.DEV) {
    if (!pageIterator) {
      const iterator: AsyncIterator<PagedRequestSP[]> = spWebContext.web.lists
        .getByTitle("caftops")
        .items.select(requestedFields)
        .filter(queryString)
        .orderBy(
          sortParams.sortColumn?.toString() || "Created",
          sortParams.sortDirection !== "descending"
        )
        .orderBy("Id", true) // Include this or non-unique sort values can cause issues
        .top(PAGESIZE)
        [Symbol.asyncIterator]();

      const data = await iterator.next();
      return { data: data.value, iterator: iterator, hasMore: !data.done };
    } else {
      const data = await pageIterator.next();
      return {
        data: data.value,
        iterator: pageIterator,
        hasMore: !data.done,
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
      let prevIterator;

      if (page > 0) {
        const data = queryClient.getQueryData([
          "paged-requests",
          sortParams,
          filterParams,
          page - 1,
        ]) as {
          data: PagedRequest[];
          iterator: AsyncIterator<PagedRequestSP[]>;
          hasMore: boolean;
        };

        prevIterator = data?.iterator;
      }

      return getPagedRequests(prevIterator, sortParams, filterParams);
    },
    // results must remain cached and not be marked stale, as we have only an iterator
    // to get more pages, which can only move forwards, not backwards
    cacheTime: Infinity,
    staleTime: Infinity,
    select: transformPagedRequestsFromSP,
    keepPreviousData: true,
  });
};
