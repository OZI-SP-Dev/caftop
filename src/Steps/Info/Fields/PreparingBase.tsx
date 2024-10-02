import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { Option } from "@fluentui/react-components";
import { usePreparingBases } from "api/PreparingBases";

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
