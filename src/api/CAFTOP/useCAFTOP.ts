import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";
import { getCAFTOPFields } from "./SampleData";
import { getFieldsForPage } from "./defaults";
import { transformRequestFromSP } from "./transform";
import { PageType, PageTypeSP, Pages } from "./types";

const getCAFTOP = async <T extends Pages>(
  id: number,
  page: T
): Promise<PageTypeSP<T>> => {
  if (!id) {
    return Promise.reject();
  }

  const requestedFields = getFieldsForPage(page);

  if (!import.meta.env.DEV) {
    return spWebContext.web.lists
      .getByTitle("caftops")
      .items.getById(id)
      .select(requestedFields)();
  } else {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(getCAFTOPFields(id, requestedFields) as PageTypeSP<T>),
        500
      )
    );
  }
};

/**
 * Get a specific CAFTOP
 */
export const useCAFTOP = <T extends Pages>(
  id: number,
  page: T
): UseQueryResult<PageType<T>> => {
  let dontRefresh;

  // If we are getting the MaxStep, then we don't need to update -- as it will be in the GlobalStore
  if (page === "MaxStep") {
    dontRefresh = { cacheTime: Infinity, staleTime: Infinity };
  }

  return useQuery({
    queryKey: [`caftop-${page}`, id],
    queryFn: () => getCAFTOP(id, page),
    select: (data) => transformRequestFromSP(data, page),
    ...(dontRefresh && dontRefresh),
  });
};
