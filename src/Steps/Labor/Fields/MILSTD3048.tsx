import { CAFTOPLabor } from "api/CAFTOP";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Radio, Text } from "@fluentui/react-components";
import { useWatch } from "react-hook-form";
import BACInput from "components/BaseFormFields/BACInput";

const MILSTD3048 = () => {
  const milstd3048Status = useWatch<CAFTOPLabor, "MILSTD3048Status">({
    name: "MILSTD3048Status",
  });

  const milstd3048Location = useWatch<CAFTOPLabor, "MILSTD3048Location">({
    name: "MILSTD3048Location",
  });

  return (
    <div className="requestFieldContainer">
      <fieldset>
        <legend>
          <Text weight="semibold">MIL-STD-3048 (S100D)</Text>
        </legend>
        <div className="requestFieldContainer">
          <BACRadioGroup<CAFTOPLabor>
            name="MILSTD3048Status"
            labelText="Does the program:"
            rules={{ required: true }}
            fieldProps={{ layout: "horizontal" }}
          >
            <Radio
              value="current"
              label="Currently sustain to MIL-STD-3048 (S1000D)"
            />
            <Radio
              value="plan"
              label="Plan to author to MIL-STD-3048 (S1000D)"
            />
            <Radio
              value="noplan"
              label="Does not plan to author to MIL-STD-3048 (S1000D)"
            />
          </BACRadioGroup>
        </div>
        {milstd3048Status === "current" && (
          <div className="requestFieldContainer">
            <BACRadioGroup<CAFTOPLabor>
              name="MILSTD3048Location"
              labelText="Is the data sustained:"
              rules={{ required: true }}
              fieldProps={{ layout: "horizontal" }}
            >
              <Radio
                value="withinTDSSe"
                label="Within TOAP (utilizing the TDSSe contract)"
              />
              <Radio
                value="withinOther"
                label="Within TOAP (utilizing a different contract)"
              />
              <Radio value="outside" label="Outside TOAP" />
            </BACRadioGroup>
          </div>
        )}
        {(milstd3048Status === "plan" ||
          (milstd3048Status === "current" &&
            milstd3048Location === "withinOther")) && (
          <div className="requestFieldContainer">
            <BACInput<CAFTOPLabor>
              name="MILSTD3048Contractor"
              labelText="Contractor Name"
              rules={{ required: true }}
            />
          </div>
        )}
        {milstd3048Status === "current" && milstd3048Location === "outside" && (
          <div className="requestFieldContainer">
            <BACInput<CAFTOPLabor>
              name="MILSTD3048SourceData"
              labelText="Where is the Source Data maintained?"
              rules={{ required: true }}
            />
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default MILSTD3048;
