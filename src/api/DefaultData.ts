import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";
import { useCAFTOP } from "./CAFTOP/useCAFTOP";
import { useParams } from "react-router-dom";
import { CAFTOPInfo } from "./CAFTOP/types";

type TDefaultData = { Title: string; Value: string }[];

/** Interal Hook returning the RQ for the default data */
const useDefaultData = () => {
  /** Function to retreive the Centers, either from SharePoint, or local Dev examples
   * @returns Array of {Title: "Center"}
   */
  const getDefaultData = async () => {
    if (!import.meta.env.DEV) {
      return spWebContext.web.lists
        .getByTitle("DefaultData")
        .items.select("Title", "Value")
        .top(5000)<TDefaultData>()
        .then(transformData);
    } else {
      return new Promise<TDefaultData>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                Title: "Description",
                Value:
                  "Description of the program and other general information about the program would go into this paragraph. The following are only examples. Detailed narrative requirement for 1.0 are listed in the CAFTOP Handbook, Appendix A, CAFTOP Narrative Format and Guidance.",
              },
              {
                Title: "Introduction",
                Value:
                  "The overall health of {ProgramName} Technical Orders (TOs) is good. All  TOs are in digital format Portable Document Format (PDF) and available in the Enhanced Technical Information Management System (ETIMS).",
              },
              {
                Title: "HelpLink",
                Value: "https://usaf.dps.mil/sites/10792/SitePages/Home.aspx",
              },
            ]),
          1000
        )
      ).then(transformData);
    }
  };

  /** Turn the array of TDefaultData into a Map
   * @param data Array of {Title: "Key", Value: "DefaultData"}
   * @returns Map of the Default Data Key/Value
   */
  const transformData = (data: TDefaultData) => {
    const dataMap = new Map<string, string>();
    data.forEach((entry) => {
      dataMap.set(entry.Title, entry.Value);
    });

    return dataMap;
  };

  return useQuery({
    queryKey: ["DefaultData"],
    queryFn: getDefaultData, // This query transforms the data directly since we don't requery, we can do the "expensive" transform here since we don't have to worry about unchanged data
    staleTime: Infinity, // Keep stale and cached data, as this data is fairly static
    cacheTime: Infinity, // and therefore only needs loaded at the start of the application
  });
};

const trnasform = (value: string, caftopData: CAFTOPInfo) => {
  // Replace {ProgramName} with the selected Program Name
  return value.replaceAll("{ProgramName}", caftopData.ProgramName ?? "");
};

/** Hook returning the default Description */
export const useDefaultDescription = () => {
  const defaultData = useDefaultData();
  const { itemId } = useParams();
  const caftop = useCAFTOP(parseInt(itemId ?? "0"), "Info");
  if (caftop.data === undefined || defaultData.data === undefined) {
    return "";
  }

  return trnasform(defaultData.data.get("Description") ?? "", caftop.data);
};

/** Hook returning the default Introduction */
export const useDefaultIntroduction = () => {
  const defaultData = useDefaultData();
  const { itemId } = useParams();
  const caftop = useCAFTOP(parseInt(itemId ?? "0"), "Info");
  if (caftop.data === undefined || defaultData.data === undefined) {
    return "";
  }

  return trnasform(defaultData.data.get("Introduction") ?? "", caftop.data);
};

/** Hook returning the Help link website */
export const useDefaultHelpLink = () => {
  const defaultData = useDefaultData();

  return defaultData?.data?.get("HelpLink") ?? "";
};
