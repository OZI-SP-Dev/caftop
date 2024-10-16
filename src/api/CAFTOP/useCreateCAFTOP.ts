import { useMutation } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";
import { CAFTOPInfo } from "./types";
import { createCAFTOP } from "./SampleData";
import { transformRequestToSP } from "./transform";

// This is how far out the CAFTOP is from the year it is created in - currently they do 2 years out, so if created in 2025 it is for 2027
const CAFTOP_YEARS_OUT = 2;

export const useCreateCAFTOP = () => {
  const createFunc = async (request: CAFTOPInfo) => {
    const newItem = await transformRequestToSP(request, "Info");
    const caftopYear = new Date().getFullYear() + CAFTOP_YEARS_OUT;
    const newItemWithMaxStepAndYear = {
      ...newItem,
      wizardMaxStep: 1, // Set it to default to the second page
      Year: caftopYear, // Set the CAFTOP year
      Title: `${caftopYear}-${newItem.ProgramName}-${newItem.ProgramElementCode}`, // Set the Title value as this is the unique key
    };

    if (!import.meta.env.DEV) {
      return spWebContext.web.lists
        .getByTitle("caftops")
        .items.add(newItemWithMaxStepAndYear);
    } else {
      return new Promise((resolve) =>
        setTimeout(() => resolve(createCAFTOP(newItemWithMaxStepAndYear)), 1000)
      );
    }
  };

  return useMutation([`caftop-create`], createFunc);
};
