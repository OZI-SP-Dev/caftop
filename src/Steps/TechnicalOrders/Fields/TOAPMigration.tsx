import { CAFTOPTechnicalOrders } from "api/CAFTOP";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Radio, Text } from "@fluentui/react-components";
import { useWatch } from "react-hook-form";
import { TOAPMigrationPartially } from "./TOAPMigration.Partially";
import { TOAPMigrationNo } from "./TOAPMigration.No";

export const TOAPMigration = () => {
  const authoredInTOAPType = useWatch<
    CAFTOPTechnicalOrders,
    "AuthoredInTOAPType"
  >({
    name: "AuthoredInTOAPType",
  });

  return (
    <fieldset>
      <legend>
        <Text weight="semibold">
          Technical Order Authoring and Publishing (TOAP) Migration Plan
        </Text>
      </legend>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPTechnicalOrders>
          name="AuthoredInTOAPType"
          labelText="Are Technical Orders (TOs) authored in TOAP?"
          rules={{ required: true }}
          fieldProps={{ layout: "horizontal" }}
        >
          <Radio value="fully" label="Fully" />
          <Radio value="partially" label="Partially" />
          <Radio value="no" label="No" />
        </BACRadioGroup>
      </div>
      {authoredInTOAPType === "partially" && <TOAPMigrationPartially />}
      {authoredInTOAPType === "no" && <TOAPMigrationNo />}
    </fieldset>
  );
};
