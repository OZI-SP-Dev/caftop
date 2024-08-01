import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";

type TPreparingBases = { Title: string }[];

/** Hook returning the RQ for list of Preparing Bases */
export const usePreparingBases = () => {
  return useQuery({
    queryKey: ["PreparingBases"],
    queryFn: getPreparingBases,
    select: transformData,
    staleTime: Infinity, // Keep stale and cached data, as this data is fairly static
    cacheTime: Infinity, // and therefore only needs loaded at the start of the application
  });
};

/** Function to retreive the Preparing Bases, either from SharePoint, or local Dev examples
 * @returns Array of {Title: "Base"}
 */
const getPreparingBases = async () => {
  if (!import.meta.env.DEV) {
    return spWebContext.web.lists
      .getByTitle("PreparingBases")
      .items.orderBy("Title")
      .select("Title")
      .top(5000)<TPreparingBases>();
  } else {
    return new Promise<TPreparingBases>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { Title: "Eglin AFB, FL" },
            { Title: "Ft Detrick, MD" },
            { Title: "Hanscom AFB, MA" },
            { Title: "Hill AFB, UT" },
            { Title: "Kirtland AFB, NM" },
            { Title: "Lackland AFB, TX" },
            { Title: "Los Angeles AFB, CA" },
            { Title: "NAS Patuxent River, MD" },
            { Title: "Newark AFB, OH" },
            { Title: "Peterson AFB, CO" },
            { Title: "Peterson SFB, CO" },
            { Title: "Robins AFB, GA " },
            { Title: "Scott AFB, IL" },
            { Title: "Tinker AFB, OK" },
            { Title: "Wright Patterson AFB, OH" },
          ]),
        1000
      )
    );
  }
};

/** Turn the array of TPreparingBases into a regular string array
 * @param data Array of {Title: "Base"}
 * @returns String array of the Preparing Bases
 */
const transformData = (data: { Title: string }[]) => {
  return data.map((item) => item.Title);
};
