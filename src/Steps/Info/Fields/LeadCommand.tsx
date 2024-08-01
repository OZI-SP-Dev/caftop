import { z } from "zod";
import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP";
import { Option } from "@fluentui/react-components";
import { useLeadCommands } from "api/LeadCommands";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Lead Command from the list");

export const LeadCommandRuleFinal = z.object({
  LeadCommand: finalRule,
});

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
