import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP";
import { Option } from "@fluentui/react-components";
import { useCenters } from "api/Centers";

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
