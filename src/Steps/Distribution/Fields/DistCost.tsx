import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPDistribution } from "api/CAFTOP";
import { useWatch } from "react-hook-form";
import { Radio, Text } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Distribution } from "stateManagement/reducer";
import { populateWithDefaultValue } from "utilities/Validations";

const distcostBaseRule = z.union([
  z.literal(""),
  z.coerce
    .number()
    .positive("Distribution Cost must be greater than zero")
    .safe()
    .step(1, "Distribution Cost must be a whole dollar value"),
]);

export const distcostRuleSave = z.discriminatedUnion("hasDistCost", [
  z.object({
    hasDistCost: z.enum(["no", ""]),
    DistCost: populateWithDefaultValue(Distribution.DistCost),
  }),
  z.object({
    hasDistCost: z.literal("yes"),
    DistCost: distcostBaseRule,
  }),
]);

export const distcostRuleFinal = z.discriminatedUnion(
  "hasDistCost",
  [
    z.object({
      hasDistCost: z.enum(["no"]),
      DistCost: populateWithDefaultValue(Distribution.DistCost),
    }),
    z.object({
      hasDistCost: z.literal("yes"),
      DistCost: distcostBaseRule.pipe(
        z.number({
          invalid_type_error: "Distribution Cost must be greater than zero",
        })
      ),
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        return {
          message:
            "You must select whether there are Distribution Costs or not",
        };
      }
      return { message: ctx.defaultError };
    },
  }
);

const DistCost = () => {
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

export default DistCost;
