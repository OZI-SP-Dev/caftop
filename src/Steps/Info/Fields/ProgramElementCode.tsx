import BACDropdown from "components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { useProgramNamesAndECs } from "api/ProgramNamesAndElementCodes";
import { Option } from "@fluentui/react-components";
import { useWatch } from "react-hook-form";
import { useContext } from "react";
import { globalContext } from "stateManagement/GlobalStore";

interface IProgramElementCodeProps {
  isFilter?: boolean;
}

export const ProgramElementCode = (props: IProgramElementCodeProps) => {
  const { globalState } = useContext(globalContext);
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
      rules={{ required: !props.isFilter }}
      fieldProps={{
        disabled: !props.isFilter && globalState.wizardMaxStep >= 1,
      }}
    >
      {availablePECS.map((item) => (
        <Option key={item} value={item} text={item}>
          {item}
        </Option>
      ))}
    </BACDropdown>
  );
};
