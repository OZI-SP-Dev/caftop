import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPLRDP } from "api/CAFTOP";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Button,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useArrowNavigationGroup,
  Text,
} from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { LRDP as LRDPDefault } from "stateManagement/reducer";
import {
  DeleteRegular,
  ArrowUp16Regular,
  ArrowDown16Regular,
  DragRegular,
} from "@fluentui/react-icons";
import { SyntheticEvent, DragEvent, useEffect } from "react";
import { populateWithDefaultValue } from "utilities/Validation";

const lrdpName = z.string().trim().max(50, "Name cannot exceed 50 characters");
const lrdpSeqNumFinal = z
  .string()
  .trim()
  .regex(/^\d{5}$/, "This must be a 5 digit number");
const lrdpSeqNumSave = z.union([z.literal(""), lrdpSeqNumFinal]);

const checkForDuplicates = (items: CAFTOPLRDP, ctx: z.RefinementCtx) => {
  const uniqueValuesName = new Map<string, number>();
  const uniqueValuesSeqNum = new Map<string, number>();
  items.LRDP.forEach((item, idx) => {
    const firstAppearanceNameIndex = uniqueValuesName.get(item.Name);
    const firstAppearanceSeqNumIndex = uniqueValuesSeqNum.get(item.SeqNum);
    if (firstAppearanceNameIndex !== undefined && item.Name !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Name must be unique`,
        path: ["LRDP", idx, "Name"],
      });
      // If it wasn't flagged as already adding the first conflict, then add it and flag as added
      if (firstAppearanceNameIndex !== -1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Name must be unique`,
          path: ["LRDP", firstAppearanceNameIndex, "Name"],
        });
        uniqueValuesName.set(item.Name, -1);
      }
    } else {
      uniqueValuesName.set(item.Name, idx);
    }
    if (firstAppearanceSeqNumIndex !== undefined && item.SeqNum !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Sequence Number must be unique`,
        path: ["LRDP", idx, "SeqNum"],
      });
      if (firstAppearanceSeqNumIndex !== -1) {
        // If it wasn't flagged as already adding the first conflict, then add it and flag as added
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Sequence Number must be unique`,
          path: ["LRDP", firstAppearanceSeqNumIndex, "SeqNum"],
        });
        uniqueValuesSeqNum.set(item.SeqNum, -1);
      }
    } else {
      uniqueValuesSeqNum.set(item.SeqNum, idx);
    }
  });
};

export const lrdpRuleSave = z
  .discriminatedUnion("hasLRDP", [
    z.object({
      hasLRDP: z.enum(["no", ""]),
      LRDP: populateWithDefaultValue(LRDPDefault.LRDP),
    }),
    z.object({
      hasLRDP: z.literal("yes"),
      LRDP: z.array(z.object({ Name: lrdpName, SeqNum: lrdpSeqNumSave })),
    }),
  ])
  .superRefine(checkForDuplicates);

export const lrdpRuleFinal = z
  .discriminatedUnion(
    "hasLRDP",
    [
      z.object({
        hasLRDP: z.enum(["no"]),
        LRDP: populateWithDefaultValue(LRDPDefault.LRDP),
      }),
      z.object({
        hasLRDP: z.literal("yes"),
        LRDP: z
          .array(
            z.object({
              Name: lrdpName.min(1, "You must supply a name"),
              SeqNum: lrdpSeqNumFinal,
            })
          )
          .min(1, "You must have at least one LRDP priority"),
      }),
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
          return {
            message: "You must select whether there are LRDP tasks or not",
          };
        }
        return { message: ctx.defaultError };
      },
    }
  )
  .superRefine(checkForDuplicates);

function allowDrop(e: SyntheticEvent) {
  e.preventDefault();
}

function drag(e: DragEvent<HTMLButtonElement>, rowId: number) {
  e.dataTransfer.setData("rowId", rowId.toString());
}

const LRDP = () => {
  const { trigger } = useFormContext<CAFTOPLRDP>();

  const hasLRDP = useWatch<CAFTOPLRDP, "hasLRDP">({
    name: "hasLRDP",
  });

  const LRDPArray = useWatch<CAFTOPLRDP, "LRDP">({
    name: "LRDP",
  });

  const { fields, append, remove, move } = useFieldArray({
    name: "LRDP",
  });

  useEffect(() => {
    void trigger();
  }, [LRDPArray]);

  const keyboardNavAttr = useArrowNavigationGroup({
    axis: "grid",
    tabbable: true,
  });

  function drop(
    e: DragEvent<HTMLButtonElement | HTMLTableRowElement>,
    rowId: number
  ) {
    e.preventDefault();
    const draggedRowId = parseInt(e.dataTransfer.getData("rowId") ?? "NaN");
    if (draggedRowId >= 0) {
      move(draggedRowId, rowId);
    }
  }

  const priorityCount = fields.length;

  const columns = [
    { columnKey: "priority", label: "Priority", width: "100px" },
    { columnKey: "name", label: "Name", width: "375px" },
    { columnKey: "seqNum", label: "Sequence Number", width: "200px" },
    { columnKey: "actions", width: "75px" },
  ];

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<CAFTOPLRDP>
          name="hasLRDP"
          labelText="Do you have Logistics Requirements Determination Process (LRDP) Tasks?"
          rules={{ required: true }}
          fieldProps={{ layout: "horizontal" }}
          customOnChange={(_ev, data) => {
            if (data.value === "yes" && fields.length === 0) {
              append({ Name: "Labor", SeqNum: "" });
              append({ Name: "Distribution", SeqNum: "" });
            }
          }}
        >
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
        </BACRadioGroup>
      </div>
      {hasLRDP === "yes" && (
        <div className="requestFieldContainer">
          <Table
            {...keyboardNavAttr}
            role="grid"
            aria-label="LRDP Priorities"
            style={{
              minWidth: "700px",
              tableLayout: "fixed",
              maxWidth: "700px",
              width: "700px",
            }}
            size="small"
          >
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHeaderCell
                    key={column.columnKey}
                    style={{ width: column.width }}
                  >
                    <TableCellLayout style={{ width: "375px" }}>
                      {column.label}
                    </TableCellLayout>
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow
                  key={item.id}
                  onDrop={(e) => drop(e, index)}
                  onDragOver={allowDrop}
                >
                  <TableCell role="gridcell">
                    <TableCellLayout appearance="primary">
                      <Text>{index + 1}</Text> {"   "}
                      <Button
                        aria-label="Move up priority"
                        icon={<ArrowUp16Regular />}
                        disabled={index === 0}
                        onClick={() => {
                          move(index, index - 1);
                        }}
                      />
                      <Button
                        aria-label="Move down priority"
                        icon={<ArrowDown16Regular />}
                        disabled={index === priorityCount - 1}
                        onClick={() => {
                          move(index, index + 1);
                        }}
                      />
                    </TableCellLayout>
                  </TableCell>
                  <TableCell role="gridcell">
                    <TableCellLayout style={{ width: "375px" }}>
                      <BACInput<CAFTOPLRDP>
                        name={`LRDP.${index}.Name`}
                        fieldProps={{ width: "375px" }}
                      />
                    </TableCellLayout>
                  </TableCell>
                  <TableCell role="gridcell">
                    <TableCellLayout style={{ display: "grid" }}>
                      <BACInput<CAFTOPLRDP> name={`LRDP.${index}.SeqNum`} />
                    </TableCellLayout>
                  </TableCell>
                  <TableCell role="gridcell">
                    <TableCellLayout>
                      <Button
                        aria-label="Delete"
                        icon={<DeleteRegular />}
                        disabled={priorityCount === 1}
                        onClick={() => {
                          remove(index);
                        }}
                      />
                      <Button
                        aria-label="Drag to change priority"
                        appearance="transparent"
                        disabled={priorityCount === 1}
                        icon={<DragRegular />}
                        onDragStart={(e) => drag(e, index)}
                        draggable={priorityCount !== 1}
                      />
                    </TableCellLayout>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {fields.length < 8 && (
            <div>
              <Button
                appearance="primary"
                onClick={() => append({ Name: "", SeqNum: "" })}
              >
                Add LRDP Priority
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LRDP;
