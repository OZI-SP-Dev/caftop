import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPInfo } from "api/CAFTOP";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must enter a Preparing Office")
  .max(20, "Preparing Office cannot exceed 20 characters");

export const PreparingOfficeRuleFinal = z.object({
  PreparingOffice: finalRule,
});

export const PreparingOffice = () => {
  return (
    <BACInput<CAFTOPInfo>
      name="PreparingOffice"
      labelText="Preparing Office"
      labelInfo="examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL"
      rules={{ required: true }}
      fieldProps={{
        placeholder: "examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL",
      }}
    />
  );
};
