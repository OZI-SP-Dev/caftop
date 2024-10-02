import { CAFTOPImprovements } from "api/CAFTOP/types";
import { useFieldArray, useWatch } from "react-hook-form";
import { Button, Radio, Text } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import BACInput from "components/BaseFormFields/BACInput";

export const Improvements = () => {
  const hasImprovements = useWatch<CAFTOPImprovements, "HasImprovements">({
    name: "HasImprovements",
  });

  const { fields, append, remove } = useFieldArray({
    name: "Improvements",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPImprovements>
          name="HasImprovements"
          labelText="Are there improvements?"
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
      {hasImprovements === "yes" && (
        <>
          {fields.map((data, index) => (
            <fieldset key={data.id}>
              <legend>
                <Text weight="semibold">Improvement Details {index + 1}</Text>
              </legend>
              <div className="requestFieldContainer">
                <BACInput<CAFTOPImprovements>
                  name={`Improvements.${index}.Title`}
                  labelText="Title"
                  rules={{ required: true }}
                />
              </div>
              <div className="requestFieldContainer">
                <BACTextarea<CAFTOPImprovements>
                  name={`Improvements.${index}.Description`}
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
                <BACTextarea<CAFTOPImprovements>
                  name={`Improvements.${index}.Impact`}
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
                Add Improvement
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};
