import { z } from "zod";
import { CAFTOPTechnicalOrders } from "api/CAFTOP";
import { Text } from "@fluentui/react-components";
import BACInput from "components/BaseFormFields/BACInput";

const numberRulesBase = (fieldName: string) => {
  return z.coerce
    .number()
    .int(`Number of ${fieldName} must be a whole number`)
    .gte(0, `Number of ${fieldName} must be greater than or equal to zero`)
    .safe();
};

const numberRulesSave = (fieldName: string) => {
  return z.literal("").or(numberRulesBase(fieldName));
};

const numberRulesFinal = (fieldName: string) => {
  return z
    .number()
    .or(
      z
        .string()
        .min(1, `Number of ${fieldName} must be greater than or equal to zero`)
    )
    .pipe(numberRulesBase(fieldName));
};

export const tocountsRuleSave = z.object({
  NumElectronic: numberRulesSave("Electronic"),
  NumPaper: numberRulesSave("Paper"),
  NumCDDVD: numberRulesSave("CD/DVD"),
  NumUnpublished: numberRulesSave("Unpublished"),
  NumInAcquisition: numberRulesSave("In Acquisition"),
});

export const tocountsRuleFinal = z.object({
  NumElectronic: numberRulesFinal("Electronic"),
  NumPaper: numberRulesFinal("Paper"),
  NumCDDVD: numberRulesFinal("CD/DVD"),
  NumUnpublished: numberRulesFinal("Unpublished"),
  NumInAcquisition: numberRulesFinal("In Acquisition"),
});

const TOAPMigration = () => {
  return (
    <fieldset>
      <legend>
        <Text weight="semibold">Number of Technical Orders</Text>
      </legend>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumElectronic"
          labelText="Electronic WA-1 or WA-2"
          rules={{ required: true }}
          fieldProps={{ type: "number" }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumPaper"
          labelText="Paper"
          rules={{ required: true }}
          fieldProps={{ type: "number" }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumCDDVD"
          labelText="CD/DVD"
          rules={{ required: true }}
          fieldProps={{ type: "number" }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumUnpublished"
          labelText="Unpublished"
          rules={{ required: true }}
          fieldProps={{ type: "number" }}
        />
      </div>
      <div className="requestFieldContainer">
        <BACInput<CAFTOPTechnicalOrders>
          name="NumInAcquisition"
          labelText="In Acquistion"
          rules={{ required: true }}
          fieldProps={{ type: "number" }}
        />
      </div>
    </fieldset>
  );
};

export default TOAPMigration;
