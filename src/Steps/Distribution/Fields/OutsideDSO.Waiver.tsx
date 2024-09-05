import { Radio } from "@fluentui/react-components";
import { CAFTOPDistribution } from "api/CAFTOP";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { useWatch } from "react-hook-form";

const OutsideDSOWaiver = () => {
  const approvedWaiver = useWatch<CAFTOPDistribution, "ApprovedWaiver">({
    name: "ApprovedWaiver",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPDistribution>
          name="ApprovedWaiver"
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
            name="ApprovedWaiverDate"
            labelText="Date current waiver was approved"
            rules={{ required: true }}
            fieldProps={{
              maxDate: new Date(Date.now()),
              formatDate: (date) => {
                if (date) {
                  return (
                    date.toLocaleDateString("en-US", { day: "2-digit" }) +
                    " " +
                    date.toLocaleDateString("en-US", { month: "long" }) +
                    " " +
                    date.toLocaleDateString("en-US", { year: "numeric" })
                  );
                } else {
                  return "";
                }
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default OutsideDSOWaiver;
