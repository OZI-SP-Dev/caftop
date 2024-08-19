import { Text } from "@fluentui/react-components";
import { z } from "zod";
import { CAFTOPInfo } from "api/CAFTOP";
import { useFormContext } from "react-hook-form";
import BACInput from "components/BaseFormFields/BACInput";
import { SyntheticEvent } from "react";
import { PopupPeoplePicker } from "components/PeoplePicker/PopupPeoplePicker";
import { getSPUserProfileData } from "api/SPWebContext";
import { Person } from "api/UserApi";

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
  .trim()
  .email()
  .min(1, "Email is required")
  .max(320, "Email cannot exceed 320 characters");

export const TechOrderManagerRuleFinal = z.object({
  TechOrderManager: z.object({
    FirstName: firstNameRule,
    LastName: lastNameRule,
    DSN: dsnRule,
    Email: finalEmailRule,
  }),
});

export const TechOrderManager = () => {
  const myForm = useFormContext();

  const formatDSN = (dsn: string) => {
    let endsDash = false;
    let retVal = dsn;
    if (dsn.match(/-$/)) {
      endsDash = true;
    }
    retVal = dsn.replace(/\D/g, "");
    const size = retVal.length;
    if (size > 3 || endsDash) {
      // If we have more than 3 numbers, or we have either (###) or (###) ###-
      // The second condition allows them to type a dash, otherwise the code would "reject" it
      retVal = "(" + retVal.slice(0, 3) + ") " + retVal.slice(3, 10);
    }
    if (size > 6 || (size > 5 && endsDash)) {
      retVal = retVal.slice(0, 9) + "-" + retVal.slice(9);
    }
    return retVal;
  };

  const onDSNInput = (e: SyntheticEvent<HTMLInputElement>) => {
    const formattedDSN = formatDSN(e.currentTarget.value);
    const start = e.currentTarget.selectionStart ?? 1;
    const length = e.currentTarget.value.length;
    e.currentTarget.value = formattedDSN;
    if (start < length) {
      e.currentTarget.setSelectionRange(start, start);
    }
  };

  const setTechOrderManagerValues = async (
    techOrderManager: string,
    person: Person[]
  ) => {
    const user = await getSPUserProfileData(person[0].EMail);

    let workPhone = "",
      firstName = "",
      lastName = "";

    user.UserProfileProperties.forEach(function (prop: {
      Key: string;
      Value: string;
    }) {
      switch (prop.Key) {
        case "WorkPhone":
          workPhone = prop.Value;
          break;
        case "FirstName":
          firstName = prop.Value;
          break;
        case "LastName":
          lastName = prop.Value;
          break;
      }
    });

    myForm.setValue(techOrderManager + ".FirstName", firstName, {
      shouldValidate: true,
    });
    myForm.setValue(techOrderManager + ".LastName", lastName, {
      shouldValidate: true,
    });
    myForm.setValue(techOrderManager + ".DSN", formatDSN(workPhone), {
      shouldValidate: true,
    });
    myForm.setValue(techOrderManager + ".Email", person[0].EMail, {
      shouldValidate: true,
    });
  };

  return (
    <fieldset>
      <legend>
        <Text weight="semibold">Tech Order Manager</Text>
      </legend>
      <div className="requestFieldContainer">
        <PopupPeoplePicker
          onUpdate={(person: Person[]) =>
            setTechOrderManagerValues("TechOrderManager", person)
          }
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPInfo>
          name="TechOrderManager.FirstName"
          labelText="First Name"
          rules={{ required: true }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPInfo>
          name="TechOrderManager.LastName"
          labelText="Last Name"
          rules={{ required: true }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPInfo>
          name="TechOrderManager.DSN"
          labelText="DSN"
          rules={{ required: true }}
          fieldProps={{ onInput: onDSNInput, type: "tel" }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPInfo>
          name="TechOrderManager.Email"
          labelText="Email"
          rules={{
            required: true,
          }}
          fieldProps={{ type: "email" }}
        />
      </div>
    </fieldset>
  );
};
