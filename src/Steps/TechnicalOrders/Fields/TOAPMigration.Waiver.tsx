import { Radio } from "@fluentui/react-components";
import { CAFTOPTechnicalOrders } from "api/CAFTOP";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { useWatch } from "react-hook-form";
import { formatDate } from "utilities/Date";

const TOAPMigrationWaiver = () => {
  const approvedWaiver = useWatch<CAFTOPTechnicalOrders, "ApprovedWaiver">({
    name: "ApprovedWaiver",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPTechnicalOrders>
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
          <BACDatePicker<CAFTOPTechnicalOrders>
            name="ApprovedWaiverDate"
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

export default TOAPMigrationWaiver;
