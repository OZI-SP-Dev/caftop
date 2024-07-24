import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "./SPWebContext";

type TLeadCommands = { Title: string }[];

export const useLeadCommands = () => {
  return useQuery({
    queryKey: ["LeadCommand"],
    queryFn: getLeadCommands,
    select: transformData,
  });
};

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

const transformData = (data: TLeadCommands) => {
  return data.map((item) => item.Title);
};
