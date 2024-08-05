import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";

type TCenters = { Title: string }[];

/** Hook returning the RQ for list of Centers */
export const useCenters = () => {
  return useQuery({
    queryKey: ["Centers"],
    queryFn: getCenters,
    select: transformData,
    staleTime: Infinity, // Keep stale and cached data, as this data is fairly static
    cacheTime: Infinity, // and therefore only needs loaded at the start of the application
  });
};

/** Function to retreive the Centers, either from SharePoint, or local Dev examples
 * @returns Array of {Title: "Center"}
 */
const getCenters = async () => {
  if (!import.meta.env.DEV) {
    return spWebContext.web.lists
      .getByTitle("Centers")
      .items.orderBy("Title")
      .select("Title")
      .top(5000)<TCenters>();
  } else {
    return new Promise<TCenters>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { Title: "AFLCMC" },
            { Title: "AFMRA" },
            { Title: "AFNWC" },
            { Title: "AFSC" },
            { Title: "HQCCC" },
            { Title: "SMC" },
            { Title: "SSC" },
          ]),
        1000
      )
    );
  }
};

/** Turn the array of TCenters into a regular string array
 * @param data Array of {Title: "Center"}
 * @returns String array of the Centers
 */
const transformData = (data: TCenters) => {
  return data.map((item) => item.Title);
};
