import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP/types";

export const SystemMissionDescription = () => {
  return (
    <BACTextarea<CAFTOPDescription>
      name="SystemMissionDescription"
      labelText="System/Mission Description"
      labelInfo="For examples, please refer to the CAFTOP Handbook"
      rules={{ required: true }}
      fieldProps={{
        rows: 6,
        resize: "vertical",
      }}
    />
  );
};
