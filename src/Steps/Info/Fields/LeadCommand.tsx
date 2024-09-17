import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { Option } from "@fluentui/react-components";
import { useLeadCommands } from "api/LeadCommands";

export const LeadCommand = () => {
  const LeadCommands = useLeadCommands();

  return (
    <BACDropdown<CAFTOPInfo>
      name="LeadCommand"
      labelText="Lead Command"
      rules={{ required: true }}
    >
      {LeadCommands.data?.map((item) => (
        <Option key={item} value={item} text={item}>
          {item}
        </Option>
      ))}
    </BACDropdown>
  );
};
