import { z } from "zod";
import { CAFTOPLabor } from "api/CAFTOP";
import { useFieldArray, useWatch } from "react-hook-form";
import { Button, Radio, Text } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Labor } from "stateManagement/reducer";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import BACInput from "components/BaseFormFields/BACInput";

const titleRule = z.string().trim().min(1, "Title is required");

const descriptionRule = z.string().trim().min(1, "Description is required");

const impactRule = z.string().trim().min(1, "Impact is required");

const additionalLaborDetailsRule = z
  .array(
    z.object({
      Title: titleRule,
      Description: descriptionRule,
      Impact: impactRule,
    })
  )
  .max(10, "No more than 10 Additional Labor items are allowed")
  .min(
    1,
    "At least 1 Additional Labor item must be entered if you selected there is Additional Labor"
  );

export const additionalLaborRuleFinal = z.discriminatedUnion(
  "HasAdditionalLabor",
  [
    z.object({
      HasAdditionalLabor: z.literal("no"),
      AdditionalLabor: z.any().transform((_obj) => Labor.AdditionalLabor),
    }),
    z.object({
      HasAdditionalLabor: z.literal("yes"),
      AdditionalLabor: additionalLaborDetailsRule,
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        return {
          message: "You must select whether there is Additional Labor or not",
        };
      }
      return { message: ctx.defaultError };
    },
  }
);

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
