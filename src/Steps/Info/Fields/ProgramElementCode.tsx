import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP";
import { useProgramNamesAndECs } from "api/ProgramNamesAndElementCodes";
import { Option } from "@fluentui/react-components";
import { useWatch } from "react-hook-form";

export const ProgramElementCode = () => {
  const ProgramNames = useProgramNamesAndECs();
  const programName = useWatch<CAFTOPInfo, "ProgramName">({
    name: "ProgramName",
  });
  const availablePECS =
    ProgramNames?.data?.find((item) => item.Title === programName)?.PECs ?? [];
  return (
    <BACDropdown<CAFTOPInfo>
      name="ProgramElementCode"
      labelText="Program Element Code (PEC)"
      rules={{ required: true }}
    >
      {availablePECS.map((item) => (
        <Option key={item} value={item} text={item}>
          {item}
        </Option>
      ))}
    </BACDropdown>
  );
};
