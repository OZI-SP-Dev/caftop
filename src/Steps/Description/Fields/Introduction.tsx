import { z } from "zod";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP";

const finalRule = z.string().trim().min(1, "You must enter a Introduction");

export const IntroductionRuleFinal = z.object({
  Introduction: finalRule,
});

const Introduction = () => {
  return (
    <BACTextarea<CAFTOPDescription>
      name="Introduction"
      labelText="Introduction"
      rules={{ required: true }}
      fieldProps={{
        rows: 6,
        resize: "vertical",
      }}
    />
  );
};

export default Introduction;
