import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPDescription } from "api/CAFTOP";
import { useWatch } from "react-hook-form";
import { Description } from "stateManagement/reducer";
import { Text } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Radio } from "@fluentui/react-components";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";

const populateWithDefaultValue = (
  value: string | CAFTOPDescription["ContractorSupport"]
) => z.any().transform((_obj) => value);

const laborCostBaseRule = z.union([
  z.literal(""),
  z.coerce
    .number()
    .nonnegative()
    .safe()
    .step(1, "Labor Cost must be a whole dollar value"),
]);

const contractornameBaseRule = z
  .string()
  .trim()
  .max(50, "Contractor Name cannot exceed 50 characters");

const tdsseCtr =
  "AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)";

const tdsseBaseRule = z.discriminatedUnion("TDSSe", [
  z.object({
    TDSSe: z.literal(""),
    TDSSeRobins: populateWithDefaultValue(
      Description.ContractorSupport.TDSSeRobins
    ),
    ContractorName: populateWithDefaultValue(
      Description.ContractorSupport.TDSSeRobins
    ),
  }),
  z.object({
    TDSSe: z.literal("yes"),
    TDSSeRobins: z.enum(["yes", "no", ""]),
    ContractorName: populateWithDefaultValue(tdsseCtr),
  }),
  z.object({
    TDSSe: z.literal("no"),
    TDSSeRobins: populateWithDefaultValue(
      Description.ContractorSupport.TDSSeRobins
    ),
    ContractorName: contractornameBaseRule,
  }),
]);

const tdsseFinalRule = z.discriminatedUnion(
  "TDSSe",
  [
    z.object({
      TDSSe: z.literal("yes"),
      TDSSeRobins: z.enum(["yes", "no"], {
        message: "You must select if this is Robins Home Office or not",
      }),
      ContractorName: populateWithDefaultValue(tdsseCtr),
    }),
    z.object({
      TDSSe: z.literal("no"),
      TDSSeRobins: populateWithDefaultValue(
        Description.ContractorSupport.TDSSeRobins
      ),
      ContractorName: contractornameBaseRule.min(
        1,
        "You must supply a Contractor Name"
      ),
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        return {
          message: "You must select whether this is TDSSe or not",
        };
      }
      return { message: ctx.defaultError };
    },
  }
);

const contractnumberBaseRule = z
  .string()
  .trim()
  .max(20, "Contract Number cannot exceed 20 characters");

const contractexpirationBaseRule = z.date().or(z.null());

const saveRule = z.object({
  LaborCost: laborCostBaseRule,
  ContractNumber: contractnumberBaseRule,
  ContractExpiration: contractexpirationBaseRule,
});

const finalRule = z.object({
  LaborCost: laborCostBaseRule.pipe(
    z.number({
      invalid_type_error: "Labor Cost must be greater than or equal to 0",
    })
  ),
  ContractNumber: contractnumberBaseRule.min(
    1,
    "You must enter a Contract Number"
  ),
  ContractExpiration: z.date({
    // If it is "null" then override the error message with one letting them know they need to select
    invalid_type_error: "You must select a date for Contract Expiration",
  }),
});

export const ContractorSupportRuleSave = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    // If we are organic, then populate the ContractoSupport with the default blank values
    ContractorSupport: populateWithDefaultValue({
      ...Description.ContractorSupport,
    }),
  }),
  z.object({
    LaborType: z.literal("contractor"),
    ContractorSupport: saveRule.and(tdsseBaseRule),
  }),
]);

export const ContractorSupportRuleFinal = z.discriminatedUnion("LaborType", [
  z.object({
    LaborType: z.literal("organic"),
    // If we are organic, then populate the ContractoSupport with the default blank values
    ContractorSupport: populateWithDefaultValue({
      ...Description.ContractorSupport,
    }),
  }),
  z.object({
    LaborType: z.literal("contractor"),
    ContractorSupport: finalRule.and(tdsseFinalRule),
  }),
]);

const ContractorSupport = () => {
  const laborType = useWatch<CAFTOPDescription, "LaborType">({
    name: "LaborType",
  });

  const ctrSupportTDSSe = useWatch<
    CAFTOPDescription,
    "ContractorSupport.TDSSe"
  >({
    name: "ContractorSupport.TDSSe",
  });

  if (laborType === "contractor") {
    return (
      <>
        <div className="requestFieldContainer">
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
        </div>
        <div className="requestFieldContainer">
          <BACRadioGroup<CAFTOPDescription>
            name="ContractorSupport.TDSSe"
            labelText="Is support provided by TDSSe?"
            rules={{ required: true }}
            fieldProps={{ layout: "horizontal" }}
          >
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </BACRadioGroup>
        </div>
        {ctrSupportTDSSe === "yes" && (
          <div className="requestFieldContainer">
            <BACRadioGroup<CAFTOPDescription>
              name="ContractorSupport.TDSSeRobins"
              labelText="Is this part of the Robins Home Office?"
              rules={{ required: true }}
              fieldProps={{ layout: "horizontal" }}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </BACRadioGroup>
          </div>
        )}
        {ctrSupportTDSSe === "no" && (
          <div className="requestFieldContainer">
            <BACInput<CAFTOPDescription>
              name="ContractorSupport.ContractorName"
              labelText="Contractor Name"
              rules={{ required: true }}
            />
          </div>
        )}
        <div className="requestFieldContainer">
          <BACInput<CAFTOPDescription>
            name="ContractorSupport.ContractNumber"
            labelText="Contract Number"
            labelInfo="example FA8124-24-D-0003"
            rules={{ required: true }}
            fieldProps={{ placeholder: "example FA8124-24-D-0003" }}
          />
        </div>
        <div className="requestFieldContainer">
          <BACDatePicker<CAFTOPDescription>
            name="ContractorSupport.ContractExpiration"
            labelText="Contract Expiration"
            rules={{ required: true }}
            fieldProps={{
              formatDate: (date) => {
                if (date) {
                  return (
                    date.toLocaleDateString("en-US", { day: "2-digit" }) +
                    " " +
                    date.toLocaleDateString("en-US", { month: "long" }) +
                    " " +
                    date.toLocaleDateString("en-US", { year: "numeric" })
                  );
                } else {
                  return "";
                }
              },
              minDate: new Date(Date.now()),
            }}
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ContractorSupport;
