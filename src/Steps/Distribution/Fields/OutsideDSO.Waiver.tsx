import { Radio } from "@fluentui/react-components";
import { CAFTOPDistribution } from "api/CAFTOP/types";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { useWatch } from "react-hook-form";
import { formatDate } from "utilities/Date";

export const OutsideDSOWaiver = () => {
  const approvedWaiver = useWatch<CAFTOPDistribution, "ODSOApprovedWaiver">({
    name: "ODSOApprovedWaiver",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPDistribution>
          name="ODSOApprovedWaiver"
          labelText="Do you have an approved waiver?"
          rules={{ required: true }}
          fieldProps={{ layout: "horizontal" }}
        >
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </BACRadioGroup>
      </div>
      {approvedWaiver === "yes" && (
        <div className="requestFieldContainer">
          <BACDatePicker<CAFTOPDistribution>
            name="ODSOApprovedWaiverDate"
            labelText="Date current waiver was approved"
            rules={{ required: true }}
            fieldProps={{
              maxDate: new Date(Date.now()),
              formatDate: formatDate,
            }}
          />
        </div>
      )}
    </>
  );
};
