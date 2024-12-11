import BACInput from "@components/BaseFormFields/BACInput";
import { CAFTOPLabor } from "@api/CAFTOP/types";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Button, Text } from "@fluentui/react-components";
import BACRadioGroup from "@components/BaseFormFields/BACRadioGroup";
import { Radio } from "@fluentui/react-components";
import BACDatePicker from "@components/BaseFormFields/BACDatePicker";
import { formatDate } from "@utilities/Date";
import { useEffect } from "react";

export const ContractorSupport = () => {
  const myForm = useFormContext();

  const laborType = useWatch<CAFTOPLabor, "LaborType">({
    name: "LaborType",
  });

  const { fields, append, remove } = useFieldArray({
    name: "ContractorSupport",
    control: myForm.control,
  });

  const ctrSupport = useWatch<CAFTOPLabor, "ContractorSupport">({
    name: "ContractorSupport",
  });

  /* If we have no Contractor Support, and then we add it, add a default Contractor Support item */
  useEffect(() => {
    if (laborType.includes("contractor") && ctrSupport.length === 0) {
      append({
        LaborCost: "",
        TDSSe: "",
        TDSSeRobins: "",
        ContractorName: "",
        ContractNumber: "",
        ContractExpiration: null,
      });
    }
  }, [laborType, ctrSupport, append]);

  if (laborType.includes("contractor")) {
    return (
      <>
        {fields.map((data, index) => (
          <fieldset key={data.id}>
            <legend>
              <Text weight="semibold">
                Contractor Details {index > 0 ? index + 1 : ""}
              </Text>
            </legend>
            <div className="requestFieldContainer">
              <BACInput<CAFTOPLabor>
                name={`ContractorSupport.${index}.LaborCost`}
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
                name={`ContractorSupport.${index}.TDSSe`}
                labelText="Is support provided by TDSSe?"
                rules={{ required: true }}
                fieldProps={{ layout: "horizontal" }}
              >
                <Radio value="yes" label="Yes" />
                <Radio value="no" label="No" />
              </BACRadioGroup>
            </div>
            {ctrSupport[index]?.TDSSe === "yes" && (
              <div className="requestFieldContainer">
                <BACRadioGroup<CAFTOPLabor>
                  name={`ContractorSupport.${index}.TDSSeRobins`}
                  labelText="Is this part of the Robins Home Office?"
                  rules={{ required: true }}
                  fieldProps={{ layout: "horizontal" }}
                >
                  <Radio value="yes" label="Yes" />
                  <Radio value="no" label="No" />
                </BACRadioGroup>
              </div>
            )}
            {ctrSupport[index]?.TDSSe === "no" && (
              <div className="requestFieldContainer">
                <BACInput<CAFTOPLabor>
                  name={`ContractorSupport.${index}.ContractorName`}
                  labelText="Contractor Name"
                  rules={{ required: true }}
                />
              </div>
            )}
            <div className="requestFieldContainer">
              <BACInput<CAFTOPLabor>
                name={`ContractorSupport.${index}.ContractNumber`}
                labelText="Contract Number"
                labelInfo="example FA8124-24-D-0003"
                rules={{ required: true }}
                fieldProps={{ placeholder: "example FA8124-24-D-0003" }}
              />
            </div>
            <div className="requestFieldContainer">
              <BACDatePicker<CAFTOPLabor>
                name={`ContractorSupport.${index}.ContractExpiration`}
                labelText="Contract Expiration"
                rules={{ required: true }}
                fieldProps={{
                  formatDate: formatDate,
                  minDate: new Date(Date.now()),
                }}
              />
            </div>
            {fields.length > 1 && (
              <Button appearance="secondary" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </fieldset>
        ))}
        {fields.length < 5 && (
          <div>
            <Button
              appearance="primary"
              onClick={() =>
                append({
                  LaborCost: "",
                  TDSSe: "",
                  TDSSeRobins: "",
                  ContractorName: "",
                  ContractNumber: "",
                  ContractExpiration: null,
                })
              }
            >
              Add Contractor
            </Button>
          </div>
        )}
      </>
    );
  } else {
    return <></>;
  }
};
