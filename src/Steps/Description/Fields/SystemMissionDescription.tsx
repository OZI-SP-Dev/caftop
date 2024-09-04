import { z } from "zod";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { CAFTOPDescription } from "api/CAFTOP";

const baseRule = z.string().trim();

export const systemmissiondescriptionRuleSave = z.object({
  SystemMissionDescription: baseRule,
});

export const systemmissiondescriptionRuleFinal = z.object({
  SystemMissionDescription: baseRule.min(
    1,
    "You must enter a System/Mission Description"
  ),
});

const SystemMissionDescription = () => {
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

export default SystemMissionDescription;
