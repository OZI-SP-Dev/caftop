import { z } from "zod";
import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP";
import { Option } from "@fluentui/react-components";
import { usePreparingBases } from "api/PreparingBases";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Preparing Base from the list");

export const PreparingBaseRuleFinal = z.object({
  PreparingBase: finalRule,
});

export const PreparingBase = () => {
  const PreparingBases = usePreparingBases();

  return (
    <BACDropdown<CAFTOPInfo>
      name="PreparingBase"
      labelText="Preparing Base"
      rules={{ required: true }}
    >
      {PreparingBases.data?.map((item) => (
        <Option key={item} value={item} text={item}>
          {item}
        </Option>
      ))}
    </BACDropdown>
  );
};
