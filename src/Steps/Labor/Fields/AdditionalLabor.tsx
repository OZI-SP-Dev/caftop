import { CAFTOPLabor } from "api/CAFTOP";
import { useFieldArray, useWatch } from "react-hook-form";
import { Button, Radio, Text } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import BACInput from "components/BaseFormFields/BACInput";

const AdditionalLabor = () => {
  const hasAdditionalLabor = useWatch<CAFTOPLabor, "HasAdditionalLabor">({
    name: "HasAdditionalLabor",
  });

  const { fields, append, remove } = useFieldArray({
    name: "AdditionalLabor",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPLabor>
          name="HasAdditionalLabor"
          labelText="Are there additional labor details?"
          fieldProps={{ layout: "horizontal" }}
          customOnChange={(_ev, data) => {
            if (data.value === "yes" && fields.length === 0) {
              append({ Title: "", Description: "", Impact: "" });
            }
          }}
        >
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </BACRadioGroup>
      </div>
      {hasAdditionalLabor === "yes" && (
        <>
          {fields.map((data, index) => (
            <fieldset key={data.id}>
              <legend>
                <Text weight="semibold">
                  Additional Labor Details {index + 1}
                </Text>
              </legend>
              <div className="requestFieldContainer">
                <BACInput<CAFTOPLabor>
                  name={`AdditionalLabor.${index}.Title`}
                  labelText="Title"
                  rules={{ required: true }}
                />
              </div>
              <div className="requestFieldContainer">
                <BACTextarea<CAFTOPLabor>
                  name={`AdditionalLabor.${index}.Description`}
                  labelText="Description"
                  labelInfo=""
                  fieldProps={{
                    resize: "vertical",
                    rows: 6,
                  }}
                  rules={{ required: true }}
                />
              </div>
              <div className="requestFieldContainer">
                <BACTextarea<CAFTOPLabor>
                  name={`AdditionalLabor.${index}.Impact`}
                  labelText="Impact"
                  labelInfo=""
                  fieldProps={{
                    resize: "vertical",
                    rows: 6,
                  }}
                  rules={{ required: true }}
                />
              </div>
              {fields.length > 1 && (
                <Button appearance="secondary" onClick={() => remove(index)}>
                  Remove
                </Button>
              )}
            </fieldset>
          ))}
          {fields.length < 10 && (
            <div>
              <Button
                appearance="primary"
                onClick={() =>
                  append({ Title: "", Description: "", Impact: "" })
                }
              >
                Add Additional Labor
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdditionalLabor;
