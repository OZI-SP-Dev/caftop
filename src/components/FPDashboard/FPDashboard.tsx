import {
  CAFTOPFilter,
  PAGESIZE,
  usePagedRequests,
} from "api/CAFTOP/useFPCAFTOPs";
import { PagedRequest } from "api/CAFTOP/types";
import {
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Spinner,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnId,
  TableColumnSizingOptions,
  Toolbar,
  ToolbarButton,
  ToolbarProps,
  createTableColumn,
} from "@fluentui/react-components";
import {
  ArrowNextRegular,
  ArrowPreviousRegular,
  FilterRegular,
} from "@fluentui/react-icons";
import { useCallback, useRef, useState } from "react";
import { FilterIcon } from "@fluentui/react-icons-mdl2";
import FilterRequestsDrawer from "./Filter";
import { useNavigate } from "react-router-dom";

const Year = createTableColumn<PagedRequest>({
  columnId: "Year",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Year {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.Year.toString().substring(2)}
      </TableCellLayout>
    );
  },
});

const LeadCommand = createTableColumn<PagedRequest>({
  columnId: "LeadCommand",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Lead Command {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.LeadCommand}</TableCellLayout>;
  },
});

const Center = createTableColumn<PagedRequest>({
  columnId: "Center",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Center {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.Center}</TableCellLayout>;
  },
});

const ProgramElementCode = createTableColumn<PagedRequest>({
  columnId: "ProgramElementCode",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>PEC {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>{item.ProgramElementCode}</TableCellLayout>
    );
  },
});

const ProgramGroup = createTableColumn<PagedRequest>({
  columnId: "ProgramGroup",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Program Group {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.ProgramGroup}</TableCellLayout>;
  },
});

const ProgramName = createTableColumn<PagedRequest>({
  columnId: "ProgramName",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Program Name {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.ProgramName}</TableCellLayout>;
  },
});

const FPDashboard = () => {
  // HOOKS
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [sortState, setSortState] = useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "Created",
    sortDirection: "ascending",
  });
  const [filterState, setFilterState] = useState<CAFTOPFilter[]>([]);
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    filterOptions: ["myItems"],
  });
  const pagedItems = usePagedRequests(page, sortState, filterState);
  const refMap = useRef<Record<string, HTMLElement | null>>({});
  const [columnSizingOptions, setColumnSizingOptions] =
    useState<TableColumnSizingOptions>({
      Year: { minWidth: 20, idealWidth: 20 },
      LeadCommand: { minWidth: 60, idealWidth: 60 },
      Center: { minWidth: 60, idealWidth: 60 },
      ProgramElementCode: { minWidth: 60, idealWidth: 60 },
      ProgramGroup: { minWidth: 60, idealWidth: 280 },
      ProgramName: { minWidth: 60, idealWidth: 280 },
    });
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const onColumnResize = useCallback(
    (
      _e: unknown,
      { columnId, width }: { columnId: TableColumnId; width: number }
    ) => {
      setColumnSizingOptions((state) => ({
        ...state,
        [columnId]: {
          ...state[columnId],
          idealWidth: width,
        },
      }));
    },
    []
  );

  // Sort/Filter Functions
  const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
    setSortState(nextSortState);
    setPage(0);
  };

  const onCheckedValueChange: ToolbarProps["onCheckedValueChange"] = (
    _e,
    { name, checkedItems }
  ) => {
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
    setPage(0);
  };

  const columns: TableColumnDefinition<PagedRequest>[] = [
    Year,
    LeadCommand,
    Center,
    ProgramElementCode,
    ProgramGroup,
    ProgramName,
  ];

  // RENDER
  return (
    <>
      <FilterRequestsDrawer
        isOpen={drawerIsOpen}
        setIsOpen={setDrawerIsOpen}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <Toolbar
        checkedValues={checkedValues}
        onCheckedValueChange={onCheckedValueChange}
      >
        <ToolbarButton
          icon={<FilterIcon />}
          onClick={() => setDrawerIsOpen(true)}
        >
          Filters
        </ToolbarButton>
      </Toolbar>
      <DataGrid
        items={pagedItems?.data?.data || []}
        columns={columns}
        getRowId={(item: PagedRequest) => item.Id}
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        onColumnResize={onColumnResize}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }) => (
              <Menu openOnContext>
                <MenuTrigger>
                  <DataGridHeaderCell
                    ref={(el) => (refMap.current[columnId] = el)}
                  >
                    {renderHeaderCell(
                      filterState.filter((obj) => {
                        return obj.column === columnId;
                      }).length > 0
                    )}
                  </DataGridHeaderCell>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem
                      onClick={() =>
                        // Send focus to this input?
                        setDrawerIsOpen(true)
                      }
                      icon={<FilterRegular />}
                    >
                      Filter
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<PagedRequest>>
          {({ item, rowId }) => (
            <DataGridRow<PagedRequest>
              key={rowId}
              onClick={() => navigate(`/item/${item.Id}`)}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          appearance="primary"
          disabled={page <= 0}
          icon={<ArrowPreviousRegular />}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          appearance="primary"
          disabled={
            !pagedItems.data ||
            pagedItems.isFetching ||
            pagedItems.data.hasMore !== true ||
            pagedItems?.data?.data?.length < PAGESIZE
          }
          icon={pagedItems.isFetching ? <Spinner /> : <ArrowNextRegular />}
          iconPosition="after"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default FPDashboard;
