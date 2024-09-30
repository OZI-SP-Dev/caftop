import BACDropdown, {
  TBACDropdownProps,
} from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { Option } from "@fluentui/react-components";
import { useCenters } from "api/Centers";

interface ICenterProps {
  isFilter?: boolean;
}

export const Center = (props: ICenterProps) => {
  const Centers = useCenters();
  let filterProps: Partial<TBACDropdownProps<CAFTOPInfo>> = {};
  if (props.isFilter) {
    filterProps.fieldProps = { clearable: true };
  }

  return (
    <BACDropdown<CAFTOPInfo>
      name="Center"
      labelText="Center"
      rules={{ required: !props.isFilter }}
      {...filterProps}
    >
      {Centers.data?.map((item) => (
        <Option key={item} value={item} text={item}>
          {item}
        </Option>
      ))}
    </BACDropdown>
  );
};
