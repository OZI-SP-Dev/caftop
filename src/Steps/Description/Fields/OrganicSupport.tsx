import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPDescription } from "api/CAFTOP";
import { useWatch } from "react-hook-form";
import { Description } from "stateManagement/reducer";

const officeFinalRule = z
  .string()
  .trim()
  .min(1, "You must enter an Office")
  .max(20, "Office cannot exceed 20 characters");

const finalRule = z.object({
  Office: officeFinalRule,
});

export const OrganicSupportRuleFinal = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    OrganicSupport: finalRule,
  }),
  z.object({
    LaborType: z.literal("contractor"),
    // If it is contractor, then populate the OrganicSupport with the default blank values
    OrganicSupport: z
      .object({ Office: z.optional(z.string()) })
      .transform((_obj) => {
        return { ...Description.OrganicSupport };
      }),
  }),
]);

const OrganicSupport = () => {
  const laborType = useWatch<Pick<CAFTOPDescription, "LaborType">>({
    name: "LaborType",
  });

  if (laborType === "organic") {
    return (
      <BACInput<CAFTOPDescription>
        name="OrganicSupport.Office"
        labelText="Office"
        labelInfo="examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL"
        rules={{ required: true }}
        fieldProps={{
          placeholder: "examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL",
        }}
      />
    );
  } else {
    return <></>;
  }
};

export default OrganicSupport;