import { z } from "zod";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { CAFTOPInfo } from "api/CAFTOP";
import { useProgramNamesAndECs } from "api/ProgramNamesAndElementCodes";

const finalRule = z
  .string()
  .trim()
  .min(1, "You must select a Program Name from the list");

export const ProgramNameRuleFinal = z.object({
  ProgramName: finalRule,
});

export const ProgramName = () => {
  const ProgramNames = useProgramNamesAndECs();
  const Names =
    ProgramNames.data?.map((item) => {
      return { children: item.Title, value: item.Title };
    }) ?? [];

  return (
    <BACCombobox<CAFTOPInfo>
      name="ProgramName"
      labelText="Program Name"
      rules={{ required: true }}
      options={Names}
    />
  );
};
