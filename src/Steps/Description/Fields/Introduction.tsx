import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP";

export const Introduction = () => {
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
