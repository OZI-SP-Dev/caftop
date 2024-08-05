import { z } from "zod";
import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP";
import { Option } from "@fluentui/react-components";
import { useCenters } from "api/Centers";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Center from the list");

export const CenterRuleFinal = z.object({
  Center: finalRule,
});

export const Center = () => {
  const Centers = useCenters();

  return (
    <BACDropdown<CAFTOPInfo>
      name="Center"
      labelText="Center"
      rules={{ required: true }}
    >
      {Centers.data?.map((item) => (
        <Option key={item} value={item} text={item}>
          {item}
        </Option>
      ))}
    </BACDropdown>
  );
};
