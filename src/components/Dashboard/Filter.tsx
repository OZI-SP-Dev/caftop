import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { CAFTOPFilter } from "api/CAFTOP/useCAFTOPs";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Center,
  LeadCommand,
  ProgramElementCode,
  ProgramGroup,
  ProgramName,
} from "Steps/Info/Fields";

interface IFilterFields {
  LeadCommand: string;
  Center: string;
  ProgramElementCode: string;
  ProgramGroup: string;
  ProgramName: string;
}

const FilterRequestsDrawer = ({
  isOpen,
  setIsOpen,
  filterState,
  setFilterState,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filterState: CAFTOPFilter[];
  setFilterState: (filters: CAFTOPFilter[]) => void;
}) => {
  const defaultValues = {
    LeadCommand:
      filterState
        .filter((obj) => {
          return obj.column === "LeadCommand";
        })[0]
        ?.filter.toString() ?? "",
    Center:
      filterState
        .filter((obj) => {
          return obj.column === "Center";
        })[0]
        ?.filter.toString() ?? "",
    ProgramElementCode:
      filterState
        .filter((obj) => {
          return obj.column === "ProgramElementCodem";
        })[0]
        ?.filter.toString() ?? "",
    ProgramGroup:
      filterState
        .filter((obj) => {
          return obj.column === "ProgramGroup";
        })[0]
        ?.filter.toString() ?? "",
    ProgramName:
      filterState
        .filter((obj) => {
          return obj.column === "ProgramName";
        })[0]
        ?.filter.toString() ?? "",
  };

  const myForm = useForm<IFilterFields>({
    defaultValues,
  });

  const { handleSubmit, reset } = myForm;
  const onSubmit: SubmitHandler<IFilterFields> = (data) => {
    const newFilter: CAFTOPFilter[] = [];

    if (data.LeadCommand) {
      newFilter.push({
        column: "LeadCommand",
        filter: data.LeadCommand,
        queryString: `(LeadCommand eq '${data.LeadCommand}')`,
      });
    }

    if (data.Center) {
      newFilter.push({
        column: "Center",
        filter: data.Center,
        queryString: `(Center eq '${data.Center}')`,
      });
    }

    if (data.ProgramElementCode) {
      newFilter.push({
        column: "ProgramElementCode",
        filter: data.ProgramElementCode,
        queryString: `(ProgramElementCode eq '${data.ProgramElementCode}')`,
      });
    }

    if (data.ProgramGroup) {
      newFilter.push({
        column: "ProgramGroup",
        filter: data.ProgramGroup,
        queryString: `(ProgramGroup eq '${data.ProgramGroup}')`,
      });
    }

    if (data.ProgramName) {
      newFilter.push({
        column: "ProgramName",
        filter: data.ProgramName,
        queryString: `(ProgramName eq '${data.ProgramName}')`,
      });
    }

    setFilterState(newFilter);
    setIsOpen(false);
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      size="medium"
      style={{ height: "100vh", minWidth: "fit-content" }}
      open={isOpen}
      onOpenChange={(_e, { open }) => setIsOpen(open)}
    >
      <form
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        style={{ width: "100%" }}
      >
        <FormProvider {...myForm}>
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<DismissRegular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Filters
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody
            style={{
              /* Header/footer padding = 72px */
              maxHeight: "calc(100vh - 72px - 3em)",
              display: "grid",
            }}
          >
            <LeadCommand isFilter={true} />
            <hr />
            <Center isFilter={true} />
            <hr />
            <ProgramElementCode isFilter={true} />
            <hr />
            <ProgramGroup isFilter={true} />
            <hr />
            <ProgramName isFilter={true} />
            <hr />
          </DrawerBody>
          <DrawerFooter>
            <Button appearance="primary" type="submit" value="submit">
              Apply
            </Button>
            <Button
              onClick={() =>
                reset(
                  {
                    LeadCommand: "",
                    Center: "",
                    ProgramElementCode: "",
                    ProgramName: "",
                    ProgramGroup: "",
                  },
                  { keepDefaultValues: false }
                )
              }
            >
              Clear All
            </Button>
          </DrawerFooter>
        </FormProvider>
      </form>
    </Drawer>
  );
};

export default FilterRequestsDrawer;
