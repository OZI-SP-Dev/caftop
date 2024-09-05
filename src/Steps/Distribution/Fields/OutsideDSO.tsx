import { z } from "zod";
import { CAFTOPDistribution } from "api/CAFTOP";
import { Radio } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Distribution } from "stateManagement/reducer";
import OutsideDSOWaiver from "./OutsideDSO.Waiver";
import { useWatch } from "react-hook-form";

const populateWithDefaultValue = (value: string | null | Date) => {
  return z.any().transform((_obj) => value);
};

/** Rule for when the Outside DSO is Not Applicable */
export const outsidedsoRuleNA = z.object({
  hasOutsideDSO: populateWithDefaultValue(Distribution.hasOutsideDSO),
  ApprovedWaiver: populateWithDefaultValue(Distribution.ApprovedWaiver),
  ApprovedWaiverDate: populateWithDefaultValue(Distribution.ApprovedWaiverDate),
});

const approvedWaiverUnionSave = z.discriminatedUnion("ApprovedWaiver", [
  z
    .object({
      ApprovedWaiver: z.literal("yes"),
      ApprovedWaiverDate: z.date().or(z.null()),
    })
    .passthrough(),
  z
    .object({
      ApprovedWaiver: z.enum(["", "no"]),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    })
    .passthrough(),
]);

const approvedWaiverUnionFinal = z.discriminatedUnion("ApprovedWaiver", [
  z
    .object({
      ApprovedWaiver: z.literal("yes"),
      ApprovedWaiverDate: z.date({
        invalid_type_error: "You must select an Approved Waiver date",
      }),
    })
    .passthrough(),
  z
    .object({
      ApprovedWaiver: z.literal("no"),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    })
    .passthrough(),
  z
    .object({
      ApprovedWaiver: z.literal(""),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    })
    .passthrough(),
]);

export const outsidedsoRuleSave = z
  .discriminatedUnion("hasOutsideDSO", [
    z.object({
      hasOutsideDSO: z.enum(["no", ""]),
      ApprovedWaiver: populateWithDefaultValue(Distribution.ApprovedWaiver),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    }),
    z.object({
      hasOutsideDSO: z.enum(["yes"]),
      ApprovedWaiver: z.enum(["yes", "no", ""]),
      ApprovedWaiverDate: z.any(),
    }),
  ])
  .pipe(approvedWaiverUnionSave);

export const outsidedsoRuleFinal = z
  .discriminatedUnion("hasOutsideDSO", [
    z.object({
      hasOutsideDSO: z.enum(["no"]),
      ApprovedWaiver: populateWithDefaultValue(Distribution.ApprovedWaiver),
      ApprovedWaiverDate: populateWithDefaultValue(
        Distribution.ApprovedWaiverDate
      ),
    }),
    z.object({
      hasOutsideDSO: z.enum(["yes"]),
      ApprovedWaiver: z.enum(["yes", "no"], {
        message: "You must select whether or not you have an approved waiver",
      }),
      ApprovedWaiverDate: z.any(),
    }),
  ])
  .pipe(approvedWaiverUnionFinal);

const OutsideDSO = () => {
  const hasOutsideDSO = useWatch<CAFTOPDistribution, "hasOutsideDSO">({
    name: "hasOutsideDSO",
  });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPDistribution>
          name="hasOutsideDSO"
          labelText="Does the program have any distribution outside of Document Services Online (DSO)?"
          rules={{ required: true }}
          fieldProps={{ layout: "horizontal" }}
        >
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </BACRadioGroup>
      </div>
      {hasOutsideDSO === "yes" && <OutsideDSOWaiver />}
    </>
  );
};

export default OutsideDSO;
