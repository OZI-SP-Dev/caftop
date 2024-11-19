import BACTextarea from "@components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "@api/CAFTOP/types";

const placeHolderAndTooltip =
  "For examples, please refer to the CAFTOP Handbook";

export const ConfigurationPlan = () => {
  return (
    <BACTextarea<CAFTOPDescription>
      name="ConfigurationPlan"
      labelText="Configuration Plan"
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
