import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPInfo } from "api/CAFTOP";

export const PreparingOffice = () => {
  return (
    <BACInput<CAFTOPInfo>
      name="PreparingOffice"
      labelText="Preparing Office"
      labelInfo="examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL"
      rules={{ required: true }}
      fieldProps={{
        placeholder: "examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL",
      }}
    />
  );
};
