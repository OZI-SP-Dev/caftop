import BACTextarea from "@components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "@api/CAFTOP/types";
import { useDefaultIntroduction } from "@api/DefaultData";

export const Introduction = () => {
  const defualtIntroduction = useDefaultIntroduction();

  return (
    <BACTextarea<CAFTOPDescription>
      name="Introduction"
      labelText="Introduction"
      labelInfo={`example ${defualtIntroduction}`}
      rules={{ required: true }}
      fieldProps={{
        rows: 6,
        resize: "vertical",
        placeholder: "For an example, refer to the tooltip",
      }}
    />
  );
};
