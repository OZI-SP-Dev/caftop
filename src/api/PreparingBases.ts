import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "./SPWebContext";

type TPreparingBases = { Title: string }[];

export const usePreparingBases = () => {
  return useQuery({
    queryKey: ["PreparingBases"],
    queryFn: getPreparingBases,
    select: transformData,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

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

const transformData = (data: { Title: string }[]) => {
  return data.map((item) => item.Title);
};
