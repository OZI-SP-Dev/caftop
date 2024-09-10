import { z } from "zod";
import { CAFTOPLabor } from "api/CAFTOP";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { Radio, Text } from "@fluentui/react-components";
import { Labor } from "stateManagement/reducer";
import { useWatch } from "react-hook-form";
import BACInput from "components/BaseFormFields/BACInput";
import { populateWithDefaultValue } from "utilities/Validations";

const contractornameBaseRule = z
  .string()
  .trim()
  .max(100, "Contractor Name cannot exceed 100 characters");

const contractornameFinalRule = contractornameBaseRule.min(
  1,
  "Contractor Name is required"
);

const sourcedataBaseRule = z
  .string()
  .trim()
  .max(255, "Source Data cannot exceed 255 characters");

const sourcedataFinalRule = sourcedataBaseRule.min(
  1,
  "Source Data is required"
);

const tdsseCtr =
  "AFLCMC/LZP via Technical Data Support Service Enterprise (TDSSe)";

// Defaults for location and source data can be set if we are not "current" aka "plan" or "noplan"
const milstdNotCurrent = z.object({
  MILSTD3048Location: populateWithDefaultValue(Labor.MILSTD3048Location),
  MILSTD3048SourceData: populateWithDefaultValue(Labor.MILSTD3048SourceData),
});

const milstd3048CurrentSave = z.discriminatedUnion("MILSTD3048Location", [
  z
    .object({
      MILSTD3048Location: z.literal(""),
    })
    .passthrough(),
  z
    .object({
      MILSTD3048Location: z.literal("withinTDSSe"),
      MILSTD3048Contractor: populateWithDefaultValue(tdsseCtr),
      MILSTD3048SourceData: populateWithDefaultValue(
        Labor.MILSTD3048SourceData
      ),
    })
    .passthrough(),
  z
    .object({
      MILSTD3048Location: z.literal("withinOther"),
      MILSTD3048Contractor: contractornameFinalRule,
      MILSTD3048SourceData: populateWithDefaultValue(
        Labor.MILSTD3048SourceData
      ),
    })
    .passthrough(),
  z
    .object({
      MILSTD3048Location: z.literal("outside"),
      MILSTD3048Contractor: populateWithDefaultValue(
        Labor.MILSTD3048Contractor
      ),
      MILSTD3048SourceData: sourcedataBaseRule,
    })
    .passthrough(),
]);

const milstd3048CurrentFinal = z.discriminatedUnion("MILSTD3048Location", [
  z
    .object({
      MILSTD3048Location: z.literal(""),
    })
    .passthrough(),
  z
    .object({
      MILSTD3048Location: z.literal("withinTDSSe"),
      MILSTD3048Contractor: populateWithDefaultValue(tdsseCtr),
      MILSTD3048SourceData: populateWithDefaultValue(
        Labor.MILSTD3048SourceData
      ),
    })
    .passthrough(),
  z
    .object({
      MILSTD3048Location: z.literal("withinOther"),
      MILSTD3048Contractor: contractornameFinalRule,
      MILSTD3048SourceData: populateWithDefaultValue(
        Labor.MILSTD3048SourceData
      ),
    })
    .passthrough(),
  z
    .object({
      MILSTD3048Location: z.literal("outside"),
      MILSTD3048Contractor: populateWithDefaultValue(
        Labor.MILSTD3048Contractor
      ),
      MILSTD3048SourceData: sourcedataFinalRule,
    })
    .passthrough(),
]);

export const milstd3048RuleSave = z
  .discriminatedUnion(
    "MILSTD3048Status",
    [
      z.object({
        MILSTD3048Status: z.literal("current"),
        MILSTD3048Location: z.enum(["withinTDSSe", "withinOther", "outside"], {
          message:
            "You must select if MIL-STD-3048 (S1000D) it is within or outside TOAP",
        }),
        MILSTD3048SourceData: z.any(), // Pass these 2 values through, as we will check them in the discrimated union this is piped to
        MILSTD3048Contractor: z.any(),
      }),
      z
        .object({
          MILSTD3048Status: z.literal("plan"),
          MILSTD3048Contractor: contractornameBaseRule,
        })
        .merge(milstdNotCurrent),
      z
        .object({
          MILSTD3048Status: z.literal("noplan"),
          MILSTD3048Contractor: populateWithDefaultValue(
            Labor.MILSTD3048Contractor
          ),
        })
        .merge(milstdNotCurrent),
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
          return {
            message:
              "You must select the program's MIL-STD-3048 (S1000D) status",
          };
        }
        return { message: ctx.defaultError };
      },
    }
  )
  .pipe(milstd3048CurrentSave);

export const milstd3048RuleFinal = z
  .discriminatedUnion("MILSTD3048Status", [
    z.object({
      MILSTD3048Status: z.literal("current"),
      MILSTD3048Location: z.enum(["withinTDSSe", "withinOther", "outside"], {
        message:
          "You must select if MIL-STD-3048 (S1000D) it is within or outside TOAP",
      }),
      MILSTD3048SourceData: z.any(), // Pass these 2 values through, as we will check them in the discrimated union this is piped to
      MILSTD3048Contractor: z.any(),
    }),
    z
      .object({
        MILSTD3048Status: z.literal("plan"),
        MILSTD3048Contractor: contractornameFinalRule,
      })
      .merge(milstdNotCurrent),
    z
      .object({
        MILSTD3048Status: z.literal("noplan"),
        MILSTD3048Contractor: populateWithDefaultValue(
          Labor.MILSTD3048Contractor
        ),
      })
      .merge(milstdNotCurrent),
  ])
  .pipe(milstd3048CurrentFinal);

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
