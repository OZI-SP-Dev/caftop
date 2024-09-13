import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP";

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
