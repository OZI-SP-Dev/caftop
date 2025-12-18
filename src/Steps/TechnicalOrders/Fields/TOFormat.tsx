import BACCheckbox from "@src/components/BaseFormFields/BACCheckbox";
import { CAFTOPTechnicalOrders } from "@api/CAFTOP/types";
import { Text } from "@fluentui/react-components";
import BACInput from "@src/components/BaseFormFields/BACInput";
import { useWatch } from "react-hook-form";

const options = [
  {
    id: "Geography Markup Language (GML)",
    text: "Geography Markup Language (GML)",
  },
  {
    id: "Interactive Electronic Technical Manual (IETM)",
    text: "Interactive Electronic Technical Manual (IETM)",
  },
  {
    id: "Portable Document Format (PDF)",
    text: "Portable Document Format (PDF)",
  },
  {
    id: "Paper",
    text: "Paper",
  },
  {
    id: "Standard Generalized Markup Language (SGML)",
    text: "Standard Generalized Markup Language (SGML)",
  },
  {
    id: "Extensible Markup Language (XML)",
    text: "Extensible Markup Language (XML)",
  },
  {
    id: "Interactive Portable Document Format (IPDF)",
    text: "Interactive Portable Document Format (IPDF)",
  },
  { id: "Other", text: "Other" },
];

export const TOFormat = () => {
  const formats = useWatch<CAFTOPTechnicalOrders, "TOFormat">({
    name: "TOFormat",
  });

  return (
    <fieldset>
      <legend>
        <Text weight="semibold">Technical Order Format</Text>
      </legend>
      <div className="requestFieldContainer">
        <BACCheckbox<CAFTOPTechnicalOrders>
          name="TOFormat"
          labelText="Technical Order Format"
          rules={{ required: true }}
          options={options}
        />
      </div>
      {formats.find((str: string) => str === "Other") && (
        <div className="requestFieldContainer">
          <BACInput<CAFTOPTechnicalOrders>
            name="TOOtherFormat"
            labelText="Other format"
            rules={{ required: false }}
          />
        </div>
      )}
    </fieldset>
  );
};
