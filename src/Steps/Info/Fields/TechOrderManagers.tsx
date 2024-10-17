import { Text, Button } from "@fluentui/react-components";
import { CAFTOPInfo } from "api/CAFTOP/types";
import { useFieldArray, useFormContext } from "react-hook-form";
import BACInput from "components/BaseFormFields/BACInput";
import { PopupPeoplePicker } from "components/PeoplePicker/PopupPeoplePicker";
import { getSPUserProfileData } from "api/SPWebContext";
import { Person } from "api/UserApi";
import { formatPhone, onPhoneBlur } from "utilities/Phone";
import { capitalizeFirstLetter } from "utilities/Names";

export const TechOrderManagers = () => {
  const myForm = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "TechOrderManagers",
    control: myForm.control,
  });

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
          firstName = capitalizeFirstLetter(prop.Value);
          break;
        case "LastName":
          lastName = capitalizeFirstLetter(prop.Value);
          break;
      }
    });

    myForm.setValue(techOrderManager + ".FirstName", firstName, {
      shouldValidate: true,
    });
    myForm.setValue(techOrderManager + ".LastName", lastName, {
      shouldValidate: true,
    });
    myForm.setValue(techOrderManager + ".Phone", formatPhone(workPhone), {
      shouldValidate: true,
    });
    myForm.setValue(techOrderManager + ".Email", person[0].EMail, {
      shouldValidate: true,
    });
  };

  return (
    <>
      {fields.map((data, index) => (
        <fieldset key={data.id}>
          <legend>
            <Text weight="semibold">
              Technical Order Manager {index > 0 ? index + 1 : ""}
            </Text>
          </legend>
          <div className="requestFieldContainer">
            <div>
              <PopupPeoplePicker
                onUpdate={(person: Person[]) =>
                  setTechOrderManagerValues(
                    `TechOrderManagers.${index}`,
                    person
                  )
                }
              />
            </div>
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`TechOrderManagers.${index}.FirstName`}
              labelText="First Name"
              rules={{ required: true }}
            />
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`TechOrderManagers.${index}.LastName`}
              labelText="Last Name"
              rules={{ required: true }}
            />
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`TechOrderManagers.${index}.Phone`}
              labelText="Phone"
              rules={{ required: true }}
              fieldProps={{ onBlur: onPhoneBlur, type: "tel" }}
            />
          </div>
          <div className="requestFieldContainer">
            <BACInput<CAFTOPInfo>
              name={`TechOrderManagers.${index}.Email`}
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
            Add Technical Order Manager
          </Button>
        </div>
      )}
    </>
  );
};
