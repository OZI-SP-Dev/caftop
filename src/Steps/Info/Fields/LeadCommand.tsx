import BACDropdown, {
  TBACDropdownProps,
} from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { Option } from "@fluentui/react-components";
import { useLeadCommands } from "api/LeadCommands";

interface ILeadCommandProps {
  isFilter?: boolean;
}

export const LeadCommand = (props: ILeadCommandProps) => {
  const LeadCommands = useLeadCommands();
  let filterProps: Partial<TBACDropdownProps<CAFTOPInfo>> = {};
  if (props.isFilter) {
    filterProps.fieldProps = { clearable: true };
  }

  return (
    <BACDropdown<CAFTOPInfo>
      name="LeadCommand"
      labelText="Lead Command"
      rules={{ required: !props.isFilter }}
      {...filterProps}
    >
      {LeadCommands.data?.map((item) => (
        <Option key={item} value={item} text={item}>
          {item}
        </Option>
      ))}
    </BACDropdown>
  );
};
