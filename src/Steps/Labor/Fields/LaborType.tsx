import BACCheckbox from "@src/components/BaseFormFields/BACCheckbox";
import { CAFTOPLabor } from "@api/CAFTOP/types";

const options = [
  { id: "contractor", text: "Contractor" },
  { id: "organic", text: "Organic" },
];

export const LaborType = () => {
  return (
    <BACCheckbox<CAFTOPLabor>
      name="LaborType"
      labelText="Labor Type"
      rules={{ required: true }}
      options={options}
    />
  );
};
