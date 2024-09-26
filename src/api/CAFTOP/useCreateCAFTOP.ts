import { useMutation } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";
import { CAFTOPInfo } from "./types";
import { createCAFTOP } from "./SampleData";
import { transformRequestToSP } from "./transform";

export const useCreateCAFTOP = () => {
  const createFunc = async (request: CAFTOPInfo) => {
    const newItem = transformRequestToSP(request, "Info");
    const newItemWithMaxStep = { ...newItem, wizardMaxStep: 1 }; // Set it to default to the second page
    if (!import.meta.env.DEV) {
      return spWebContext.web.lists
        .getByTitle("caftops")
        .items.add(newItemWithMaxStep);
    } else {
      return new Promise((resolve) =>
        setTimeout(() => resolve(createCAFTOP(newItemWithMaxStep)), 1000)
      );
    }
  };

  return useMutation([`caftop-create`], createFunc);
};
