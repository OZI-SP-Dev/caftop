import BACTextarea from "@components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "@api/CAFTOP/types";
import { useDefaultDescription } from "@api/DefaultData";

export const Description = () => {
  const defaultDescription = useDefaultDescription();

  return (
    <BACTextarea<CAFTOPDescription>
      name="Description"
      labelText="Description"
      labelInfo={`example ${defaultDescription}`}
      rules={{ required: true }}
      fieldProps={{
        rows: 6,
        resize: "vertical",
        placeholder: "For an example, refer to the tooltip",
      }}
    />
  );
};
