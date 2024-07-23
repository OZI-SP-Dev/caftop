import { z } from "zod";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { CAFTOPInfo } from "api/CAFTOP";
import { useProgramGroups } from "api/ProgramGroups";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Program Group from the list");

export const ProgramGroupRuleFinal = z.object({
  ProgramGroup: finalRule,
});

export const ProgramGroup = () => {
  const ProgramGroups = useProgramGroups();
  const Groups =
    ProgramGroups.data?.map((item) => {
      return { children: item.Title, value: item.Title };
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
