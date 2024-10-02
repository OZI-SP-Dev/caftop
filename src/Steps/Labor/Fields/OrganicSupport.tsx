import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPLabor } from "api/CAFTOP/types";
import { useWatch } from "react-hook-form";

export const OrganicSupport = () => {
  const laborType = useWatch<CAFTOPLabor, "LaborType">({
    name: "LaborType",
  });

  if (laborType === "organic") {
    return (
      <div className="requestFieldContainer">
        <BACInput<CAFTOPLabor>
          name="OrganicSupport.Office"
          labelText="Office"
          labelInfo="examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL"
          rules={{ required: true }}
          fieldProps={{
            placeholder: "examples AFLCMC/LZPTR, 406 SCMS/GUEEB, SSC/SZGL",
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};
