import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPLabor } from "api/CAFTOP/types";
import { useWatch } from "react-hook-form";
import { Text } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Radio } from "@fluentui/react-components";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";
import { formatDate } from "utilities/Date";

export const ContractorSupport = () => {
  const laborType = useWatch<CAFTOPLabor, "LaborType">({
    name: "LaborType",
  });

  const ctrSupportTDSSe = useWatch<CAFTOPLabor, "ContractorSupport.TDSSe">({
    name: "ContractorSupport.TDSSe",
  });

  if (laborType === "contractor") {
    return (
      <>
        <div className="requestFieldContainer">
          <BACInput<CAFTOPLabor>
            name="ContractorSupport.LaborCost"
            labelText="Labor Cost (if none, enter 0)"
            rules={{ required: true }}
            fieldProps={{
              type: "number",
              step: "1",
              min: "0",
              contentBefore: <Text>$</Text>,
            }}
          />
        </div>
        <div className="requestFieldContainer">
          <BACRadioGroup<CAFTOPLabor>
            name="ContractorSupport.TDSSe"
            labelText="Is support provided by TDSSe?"
            rules={{ required: true }}
            fieldProps={{ layout: "horizontal" }}
          >
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </BACRadioGroup>
        </div>
        {ctrSupportTDSSe === "yes" && (
          <div className="requestFieldContainer">
            <BACRadioGroup<CAFTOPLabor>
              name="ContractorSupport.TDSSeRobins"
              labelText="Is this part of the Robins Home Office?"
              rules={{ required: true }}
              fieldProps={{ layout: "horizontal" }}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </BACRadioGroup>
          </div>
        )}
        {ctrSupportTDSSe === "no" && (
          <div className="requestFieldContainer">
            <BACInput<CAFTOPLabor>
              name="ContractorSupport.ContractorName"
              labelText="Contractor Name"
              rules={{ required: true }}
            />
          </div>
        )}
        <div className="requestFieldContainer">
          <BACInput<CAFTOPLabor>
            name="ContractorSupport.ContractNumber"
            labelText="Contract Number"
            labelInfo="example FA8124-24-D-0003"
            rules={{ required: true }}
            fieldProps={{ placeholder: "example FA8124-24-D-0003" }}
          />
        </div>
        <div className="requestFieldContainer">
          <BACDatePicker<CAFTOPLabor>
            name="ContractorSupport.ContractExpiration"
            labelText="Contract Expiration"
            rules={{ required: true }}
            fieldProps={{
              formatDate: formatDate,
              minDate: new Date(Date.now()),
            }}
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
