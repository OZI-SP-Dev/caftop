import BACCombobox from "components/BaseFormFields/BACCombobox";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { useProgramGroups } from "api/ProgramGroups";

export const ProgramGroup = () => {
  const ProgramGroups = useProgramGroups();
  const Groups =
    ProgramGroups.data?.map((item) => {
      return { children: item, value: item };
    }) ?? [];

  return (
    <BACCombobox<CAFTOPInfo>
      name="ProgramGroup"
      labelText="Program Group"
      rules={{ required: true }}
      options={Groups}
    ></BACCombobox>
  );
};
