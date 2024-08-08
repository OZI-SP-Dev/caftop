import { z } from "zod";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP";

const finalRule = z.string().trim().min(1, "You must enter a Description");

export const DescriptionRuleFinal = z.object({
  Description: finalRule,
});

const Description = () => {
  return (
    <BACTextarea<CAFTOPDescription>
      name="Description"
      labelText="Description"
      rules={{ required: true }}
      fieldProps={{
        rows: 6,
        resize: "vertical",
      }}
    />
  );
};

export default Description;
