import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPLabor } from "api/CAFTOP";
import { useWatch } from "react-hook-form";
import { Labor } from "stateManagement/reducer";

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
        return { ...Labor.OrganicSupport };
      }),
  }),
]);

const OrganicSupport = () => {
  const laborType = useWatch<CAFTOPLabor, "LaborType">({
    name: "LaborType",
  });

  if (laborType === "organic") {
    return (
      <div className="requestFieldContainer">
        <BACInput<CAFTOPLabor>
          name="OrganicSupport.Office"
          labelText="Office"
          labelInfo="examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL"
          rules={{ required: true }}
          fieldProps={{
            placeholder: "examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL",
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default OrganicSupport;
