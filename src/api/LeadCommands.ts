import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";

type TLeadCommands = { Title: string }[];

/** Hook returning the RQ for list of Lead Commands */
export const useLeadCommands = () => {
  return useQuery({
    queryKey: ["LeadCommand"],
    queryFn: getLeadCommands,
    select: transformData,
    staleTime: Infinity, // Keep stale and cached data, as this data is fairly static
    cacheTime: Infinity, // and therefore only needs loaded at the start of the application
  });
};

/** Function to retreive the Lead commands, either from SharePoint, or local Dev examples
 * @returns Array of {Title: "LeadCommand"}
 */
const getLeadCommands = async () => {
  if (!import.meta.env.DEV) {
    return spWebContext.web.lists
      .getByTitle("LeadCommands")
      .items.orderBy("Title")
      .select("Title")
      .top(5000)<TLeadCommands>();
  } else {
    return new Promise<TLeadCommands>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { Title: "ACC" },
            { Title: "AETC" },
            { Title: "AFGSC" },
            { Title: "AFFSA" },
            { Title: "AFMC" },
            { Title: "AFMED" },
            { Title: "AFRC" },
            { Title: "AFSOC" },
            { Title: "AFSPC" },
            { Title: "AMC" },
            { Title: "AFISR" },
            { Title: "AFWA" },
            { Title: "AFPA" },
            { Title: "USSF" },
          ]),
        1000
      )
    );
  }
};

/** Turn the array of TLeadCommands into a regular string array
 * @param data Array of {Title: "LeadCommand"}
 * @returns String array of the Lead Commands
 */
const transformData = (data: TLeadCommands) => {
  return data.map((item) => item.Title);
};
