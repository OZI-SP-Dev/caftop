import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPDescription } from "api/CAFTOP";
import { useWatch } from "react-hook-form";
import { Description } from "stateManagement/reducer";
import { Text } from "@fluentui/react-components";

const laborCostBaseRule = z.union([
  z.literal(""),
  z.coerce
    .number()
    .nonnegative()
    .safe()
    .step(1, "Labor Cost must be a whole dollar value"),
]);

const saveRule = z.object({
  LaborCost: laborCostBaseRule,
});

const finalRule = z.object({
  LaborCost: laborCostBaseRule.pipe(
    z.number({
      invalid_type_error: "Labor Cost must be greater than or equal to 0",
    })
  ),
});

export const ContractorSupportRuleSave = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    // If we are organic, then populate the ContractoSupport with the default blank values
    ContractorSupport: z
      .object({ LaborCost: z.optional(z.string()) })
      .transform((_obj) => {
        return { ...Description.ContractorSupport };
      }),
  }),
  z.object({
    LaborType: z.literal("contractor"),
    ContractorSupport: saveRule,
  }),
]);

export const ContractorSupportRuleFinal = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    // If we are organic, then populate the ContractoSupport with the default blank values
    ContractorSupport: z
      .object({ LaborCost: z.optional(z.string()) })
      .transform((_obj) => {
        return { ...Description.ContractorSupport };
      }),
  }),
  z.object({
    LaborType: z.literal("contractor"),
    ContractorSupport: finalRule,
  }),
]);

const ContractorSupport = () => {
  const laborType = useWatch<Pick<CAFTOPDescription, "LaborType">>({
    name: "LaborType",
  });

  if (laborType === "contractor") {
    return (
      <BACInput<CAFTOPDescription>
        name="ContractorSupport.LaborCost"
        labelText="Labor Cost (if none, enter 0)"
        rules={{ required: true }}
        fieldProps={{
          type: "number",
          step: "1",
          min: "0",
          contentBefore: <Text>$</Text>,
        }}
      />
    );
  } else {
    return <></>;
  }
};

export default ContractorSupport;
