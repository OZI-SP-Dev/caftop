import { Text, Button } from "@fluentui/react-components";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { useFieldArray, useFormContext } from "react-hook-form";
import BACInput from "components/BaseFormFields/BACInput";
import { PopupPeoplePicker } from "components/PeoplePicker/PopupPeoplePicker";
import { getSPUserProfileData } from "api/SPWebContext";
import { Person } from "api/UserApi";
import { formatPhone, onPhoneInput } from "utilities/Phone";

export const ProgramManagers = () => {
  const myForm = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "ProgramManagers",
    control: myForm.control,
  });

  const setProgramManagerValues = async (
    programManager: string,
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

    myForm.setValue(programManager + ".FirstName", firstName, {
      shouldValidate: true,
    });
    myForm.setValue(programManager + ".LastName", lastName, {
      shouldValidate: true,
    });
    myForm.setValue(programManager + ".Phone", formatPhone(workPhone), {
      shouldValidate: true,
    });
    myForm.setValue(programManager + ".Email", person[0].EMail, {
      shouldValidate: true,
    });
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
            <div>
              <PopupPeoplePicker
                onUpdate={(person: Person[]) =>
                  setProgramManagerValues(`ProgramManagers.${index}`, person)
                }
              />
            </div>
          </div>
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
              name={`ProgramManagers.${index}.Phone`}
              labelText="Phone"
              rules={{ required: true }}
              fieldProps={{ onInput: onPhoneInput, type: "tel" }}
            />
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`ProgramManagers.${index}.Email`}
              labelText="Email"
              rules={{
                required: true,
              }}
              fieldProps={{ type: "email" }}
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
        <div>
          <Button
            appearance="primary"
            onClick={() =>
              append({ FirstName: "", LastName: "", Phone: "", Email: "" })
            }
          >
            Add Program Manager
          </Button>
        </div>
      )}
    </>
  );
};
