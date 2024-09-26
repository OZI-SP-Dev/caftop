import { useMutation, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";
import { CAFTOPPage, Pages } from "./types";
import { updateCAFTOPFields } from "./SampleData";
import { transformRequestToSP } from "./transform";

export const useUpdateCAFTOP = (id: string | undefined, page: Pages) => {
  const queryClient = useQueryClient();
  const idNum = parseInt(id ?? "");
  const updateFunc = async (request: CAFTOPPage) => {
    const transformedData = transformRequestToSP(request, page);

    if ("wizardMaxStep" in request) {
      Object.assign(transformedData, { wizardMaxStep: request.wizardMaxStep });
    }
    if (!import.meta.env.DEV) {
      return spWebContext.web.lists
        .getByTitle("caftops")
        .items.getById(idNum)
        .update(transformedData);
    } else {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve(updateCAFTOPFields(idNum, transformedData)),
          1000
        )
      );
    }
  };

  return useMutation([`caftop-${page}-update`, id], updateFunc, {
    onSuccess: () => {
      void queryClient.invalidateQueries([`caftop-${page}`, id]);

      if (page === "TechnicalOrders") {
        // If updating the TechOrders, the fields are also used in Distribution
        void queryClient.invalidateQueries([`caftop-Distribution`, id]);
      }
    },
  });
};
