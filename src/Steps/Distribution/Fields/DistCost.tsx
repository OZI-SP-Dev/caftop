import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPDistribution } from "api/CAFTOP/types";
import { useWatch } from "react-hook-form";
import { Radio, Text } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

export const DistCost = () => {
  const hasDistCost = useWatch<CAFTOPDistribution, "hasDistCost">({
    name: "hasDistCost",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPDistribution>
          name="hasDistCost"
          labelText="Are there Distribution Costs?"
          rules={{ required: true }}
          fieldProps={{ layout: "horizontal" }}
        >
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </BACRadioGroup>
      </div>
      {hasDistCost === "yes" && (
        <div className="requestFieldContainer">
          <BACInput<CAFTOPDistribution>
            name="DistCost"
            labelText="Distribution Cost"
            rules={{ required: true }}
            fieldProps={{
              type: "number",
              step: "1",
              min: "0",
              contentBefore: <Text>$</Text>,
            }}
          />
        </div>
      )}
    </>
  );
};
