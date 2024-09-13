import { z } from "zod";
import BACInput from "components/BaseFormFields/BACInput";
import { CAFTOPLRDP } from "api/CAFTOP";
import { useFieldArray, useWatch } from "react-hook-form";
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
import { SyntheticEvent, DragEvent } from "react";
import { populateWithDefaultValue } from "utilities/Validation";

const lrdpName = z.string().trim().max(50, "Name cannot exceed 50 characters");
const lrdpSeqNumFinal = z
  .string()
  .trim()
  .regex(/^\d{5}$/, "This must be a 5 digits");
const lrdpSeqNumSave = z.union([z.literal(""), lrdpSeqNumFinal]);

const checkForDuplicates = (items: CAFTOPLRDP, ctx: z.RefinementCtx) => {
  const uniqueValuesName = new Map<string, number>();
  const uniqueValuesSeqNum = new Map<string, number>();
  items.LRDP.forEach((item, idx) => {
    const lowerCaseName = item.Name.toLowerCase().trim(); // Make case insensitive and remove spacing
    const firstAppearanceNameIndex = uniqueValuesName.get(lowerCaseName);
    const firstAppearanceSeqNumIndex = uniqueValuesSeqNum.get(item.SeqNum);
    if (firstAppearanceNameIndex !== undefined && lowerCaseName !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Name must be unique`,
        path: ["LRDP", idx, "Name"],
      });
    } else {
      uniqueValuesName.set(lowerCaseName, idx);
    }
    if (firstAppearanceSeqNumIndex !== undefined && item.SeqNum !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Sequence Number must be unique`,
        path: ["LRDP", idx, "SeqNum"],
      });
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

function drag(e: DragEvent<HTMLTableRowElement>, rowId: number) {
  e.dataTransfer.setData("rowId", rowId.toString());
}

const LRDP = () => {
  const hasLRDP = useWatch<CAFTOPLRDP, "hasLRDP">({
    name: "hasLRDP",
  });

  const { fields, append, remove, move } = useFieldArray({
    name: "LRDP",
  });

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
    { columnKey: "priority", label: "Priority", width: 95 },
    { columnKey: "name", label: "Name", width: 375 },
    { columnKey: "seqNum", label: "Sequence Number", width: 125 },
    { columnKey: "actions", width: 60 },
  ];

  const tableWidth = columns.reduce((prevVal, curValue) => {
    return prevVal + curValue.width;
  }, 0);

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
              tableLayout: "fixed",
              width: tableWidth + "px",
            }}
            size="small"
          >
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHeaderCell
                    key={column.columnKey}
                    style={{ width: column.width + "px" }}
                  >
                    <TableCellLayout>
                      <Text weight="bold">{column.label}</Text>
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
                  onDragStart={(e) => drag(e, index)}
                  draggable={priorityCount !== 1}
                >
                  <TableCell role="gridcell">
                    <TableCellLayout appearance="primary">
                      <Text
                        weight="bold"
                        style={{
                          width: "20px",
                          paddingRight: "8px",
                          justifyContent: "right",
                          display: "inline-flex",
                        }}
                        aria-label={`Priority ${index + 1}`}
                      >
                        {index + 1}
                      </Text>
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
                    <TableCellLayout>
                      <BACInput<CAFTOPLRDP>
                        name={`LRDP.${index}.Name`}
                        fieldProps={{
                          style: { width: columns[1].width + "px" },
                          draggable: true,
                          onDragStart: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          },
                        }}
                      />
                    </TableCellLayout>
                  </TableCell>
                  <TableCell role="gridcell">
                    <TableCellLayout style={{ display: "grid" }}>
                      <BACInput<CAFTOPLRDP>
                        name={`LRDP.${index}.SeqNum`}
                        fieldProps={{
                          style: { width: columns[2].width },
                          draggable: true,
                          onDragStart: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          },
                        }}
                      />
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
                      <DragRegular
                        aria-label="Drag to change priority"
                        fontSize={20}
                        style={{ paddingLeft: "8px", verticalAlign: "middle" }}
                      />
                    </TableCellLayout>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {fields.length < 10 && (
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
