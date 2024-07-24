import { Text, Button } from "@fluentui/react-components";
import { z } from "zod";
import { CAFTOPInfo } from "api/CAFTOP";
import { useFieldArray, useFormContext } from "react-hook-form";
import BACInput from "components/BaseFormFields/BACInput";
import { SyntheticEvent } from "react";

const firstNameRule = z
  .string()
  .trim()
  .min(1, "First Name is required")
  .max(40, "First Name cannot exceed 40 characters");
const lastNameRule = z
  .string()
  .trim()
  .min(1, "Last Name is required")
  .max(80, "Last Name cannot exceed 80 characters");
const dsnRule = z
  .string()
  .trim()
  .regex(/\(\d{3}\)\s\d{3}-\d{4}/, "DSN must be in the format (###) ###-####")
  .min(1, "DSN is required");
const finalEmailRule = z
  .string()
  .email()
  .trim()
  .min(1, "Email is required")
  .max(320, "Email cannot exceed 320 characters");

export const ProgramManagersRuleFinal = z.object({
  ProgramManagers: z
    .array(
      z.object({
        FirstName: firstNameRule,
        LastName: lastNameRule,
        DSN: dsnRule,
        Email: finalEmailRule,
      })
    )
    .max(8, "No more than 8 Program Managers are allowed")
    .min(1, "At least 1 Program Manager must be selected"),
});

export const ProgramManagers = () => {
  const myForm = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "ProgramManagers",
    control: myForm.control,
  });

  const onDSNInput = (e: SyntheticEvent<HTMLInputElement>) => {
    let endsDash = false;
    if (e.currentTarget.value.match(/-$/)) {
      endsDash = true;
    }
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
    const size = e.currentTarget.value.length;
    if (size > 3 || endsDash) {
      // If we have more than 3 numbers, or we have either (###) or (###) ###-
      // The second condition allows them to type a dash, otherwise the code would "reject" it
      e.currentTarget.value =
        "(" +
        e.currentTarget.value.slice(0, 3) +
        ") " +
        e.currentTarget.value.slice(3, 10);
    }
    if (size > 6 || (size > 5 && endsDash)) {
      e.currentTarget.value =
        e.currentTarget.value.slice(0, 9) +
        "-" +
        e.currentTarget.value.slice(9);
    }
  };

  return (
    <>
      {fields.map((data, index) => (
        <fieldset key={data.id}>
          <legend>
            <Text weight="semibold">
              Program Manager {index > 0 ? index + 1 : ""}
            </Text>
          </legend>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`ProgramManagers.${index}.FirstName`}
              labelText="First Name"
              rules={{ required: true }}
            />
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`ProgramManagers.${index}.LastName`}
              labelText="Last Name"
              rules={{ required: true }}
            />
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`ProgramManagers.${index}.DSN`}
              labelText="DSN"
              rules={{ required: true }}
              fieldProps={{ onInput: onDSNInput }}
            />
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`ProgramManagers.${index}.Email`}
              labelText="Email"
              rules={{
                required: true,
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
      {fields.length < 8 && (
        <Button
          appearance="primary"
          onClick={() =>
            append({ FirstName: "", LastName: "", DSN: "", Email: "" })
          }
        >
          Add Program Manager
        </Button>
      )}
    </>
  );
};
