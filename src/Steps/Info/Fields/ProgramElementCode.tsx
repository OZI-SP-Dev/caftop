import BACDropdown from "@components/BaseFormFields/BACDropdown";
import { CAFTOPInfo } from "@api/CAFTOP/types";
import { useProgramNamesAndECs } from "@api/ProgramNamesAndElementCodes";
import { Option } from "@fluentui/react-components";
import { useWatch } from "react-hook-form";
import { useContext } from "react";
import { globalContext } from "@stateManagement/GlobalStore";
import BACCombobox from "@components/BaseFormFields/BACCombobox";

interface IProgramElementCodeProps {
  isFilter?: boolean;
}

export const ProgramElementCode = (props: IProgramElementCodeProps) => {
  const { globalState } = useContext(globalContext);
  const ProgramNames = useProgramNamesAndECs();
  const programName = useWatch<CAFTOPInfo, "ProgramName">({
    name: "ProgramName",
  });

  let availablePECS: string[];

  if (!props.isFilter || programName) {
    // If we are not in Filter mode, or if we are in Filter mode, and they have selected a Program Name
    //  then limit selection to PECs associated with that Program Name
    availablePECS =
      ProgramNames?.data?.find((item) => item.Title === programName)?.PECs ??
      [];
  } else {
    // If we are in Filter mode, and they haven't selected a Program Name, give them all PECs as options, without duplicates
    availablePECS = ProgramNames?.data?.flatMap((item) => item.PECs) ?? [];
    availablePECS = [...new Set(availablePECS)].sort();
  }

  return (
    <>
      {!props.isFilter || programName ? (
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
      ) : (
        <BACCombobox<CAFTOPInfo>
          name="ProgramElementCode"
          labelText="Program Element Code (PEC)"
          rules={{ required: !props.isFilter }}
          fieldProps={{
            disabled: !props.isFilter && globalState.wizardMaxStep >= 1,
          }}
          options={
            availablePECS.map((item) => {
              return { children: item, value: item };
            }) ?? []
          }
        />
      )}
    </>
  );
};
