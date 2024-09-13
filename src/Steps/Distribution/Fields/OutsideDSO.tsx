import { CAFTOPDistribution } from "api/CAFTOP";
import { Radio } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import OutsideDSOWaiver from "./OutsideDSO.Waiver";
import { useWatch } from "react-hook-form";

const OutsideDSO = () => {
  const hasOutsideDSO = useWatch<CAFTOPDistribution, "hasOutsideDSO">({
    name: "hasOutsideDSO",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPDistribution>
          name="hasOutsideDSO"
          labelText="Does the program have any distribution outside of Document Services Online (DSO)?"
          rules={{ required: true }}
          fieldProps={{ layout: "horizontal" }}
        >
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </BACRadioGroup>
      </div>
      {hasOutsideDSO === "yes" && <OutsideDSOWaiver />}
    </>
  );
};

export default OutsideDSO;
