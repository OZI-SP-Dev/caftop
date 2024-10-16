import BACCombobox from "components/BaseFormFields/BACCombobox";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { useProgramNamesAndECs } from "api/ProgramNamesAndElementCodes";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { globalContext } from "stateManagement/GlobalStore";

interface IProgramNameProps {
  isFilter?: boolean;
}

export const ProgramName = (props: IProgramNameProps) => {
  const { globalState } = useContext(globalContext);
  const ProgramNames = useProgramNamesAndECs();
  const Names =
    ProgramNames.data?.map((item) => {
      return { children: item.Title, value: item.Title };
    }) ?? [];
  const { setValue } = useFormContext<CAFTOPInfo>();

  return (
    <BACCombobox<CAFTOPInfo>
      name="ProgramName"
      labelText="Program Name"
      rules={{ required: !props.isFilter }}
      fieldProps={{
        disabled: !props.isFilter && globalState.wizardMaxStep >= 1,
      }}
      options={Names}
      customOnOptionSelect={(_event, data, field) => {
        field.onChange(data.optionValue ?? "");
        const availablePECS =
          ProgramNames?.data?.find((item) => item.Title === data.optionValue)
            ?.PECs ?? [];
        // If there is only 1 available PEC, set it to it
        if (availablePECS.length === 1) {
          setValue("ProgramElementCode", availablePECS[0]);
        } else {
          // If we have 0 or more than 1 available PECs, then set it so they must select
          setValue("ProgramElementCode", "");
        }
      }}
    />
  );
};
