import BACTextarea from "@components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "@api/CAFTOP/types";

const placeHolderAndTooltip =
  "For examples, please refer to the CAFTOP Handbook";

export const SystemMissionDescription = () => {
  return (
    <BACTextarea<CAFTOPDescription>
      name="SystemMissionDescription"
      labelText="System/Mission Description"
      labelInfo={placeHolderAndTooltip}
      rules={{ required: true }}
      fieldProps={{
        rows: 6,
        resize: "vertical",
        placeholder: placeHolderAndTooltip,
      }}
    />
  );
};
