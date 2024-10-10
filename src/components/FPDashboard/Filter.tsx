import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { CAFTOPFilter } from "api/CAFTOP/useFPCAFTOPs";
import BACInput from "components/BaseFormFields/BACInput";
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
  ProgramManagers: string;
  TechOrderManagers: string;
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
          return obj.column === "ProgramElementCode";
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
    ProgramManagers:
      filterState
        .filter((obj) => {
          return obj.column === "ProgramManagers";
        })[0]
        ?.filter.toString() ?? "",
    TechOrderManagers:
      filterState
        .filter((obj) => {
          return obj.column === "TechOrderManagers";
        })[0]
        ?.filter.toString() ?? "",
  };

  const myForm = useForm<IFilterFields>({
    defaultValues,
  });

  const { handleSubmit, reset } = myForm;
  const onSubmit: SubmitHandler<IFilterFields> = (data) => {
    const newFilter: CAFTOPFilter[] = [];

    // TODO -- Add in PM and TOMA searches
    /*<Contains><FieldRef Name="ProgramManagers" /><Value Type="Note">SEARCH VALUE</Value></Contains>;*/

    if (data.LeadCommand) {
      newFilter.push({
        column: "LeadCommand",
        filter: data.LeadCommand,
        queryString: `<Eq><FieldRef Name="LeadCommand"/><Value Type="Text">${data.LeadCommand}</Value></Eq>`,
      });
    }

    if (data.Center) {
      newFilter.push({
        column: "Center",
        filter: data.Center,
        queryString: `<Eq><FieldRef Name="Center"/><Value Type="Text">${data.Center}</Value></Eq>`,
      });
    }

    if (data.ProgramElementCode) {
      newFilter.push({
        column: "ProgramElementCode",
        filter: data.ProgramElementCode,
        queryString: `<Eq><FieldRef Name="ProgramElementCode"/><Value Type="Text">${data.ProgramElementCode}</Value></Eq>`,
      });
    }

    if (data.ProgramGroup) {
      newFilter.push({
        column: "ProgramGroup",
        filter: data.ProgramGroup,
        queryString: `<Eq><FieldRef Name="ProgramGroup"/><Value Type="Text">${data.ProgramGroup}</Value></Eq>`,
      });
    }

    if (data.ProgramName) {
      newFilter.push({
        column: "ProgramName",
        filter: data.ProgramName,
        queryString: `<Eq><FieldRef Name="ProgramName"/><Value Type="Text">${data.ProgramName}</Value></Eq>`,
      });
    }

    if (data.ProgramManagers) {
      newFilter.push({
        column: "ProgramManagers",
        filter: data.ProgramManagers,
        queryString: `<Contains><FieldRef Name="ProgramManagers"/><Value Type="Note">${data.ProgramManagers}</Value></Contains>`,
      });
    }

    if (data.TechOrderManagers) {
      newFilter.push({
        column: "TechOrderManagers",
        filter: data.TechOrderManagers,
        queryString: `<Contains><FieldRef Name="TechOrderManagers"/><Value Type="Note">${data.TechOrderManagers}</Value></Contains>`,
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
            <BACInput
              name={`ProgramManagers`}
              labelText="Progrm Manager Last Name"
            />
            <hr />
            <BACInput
              name={`TechOrderManagers`}
              labelText="Technical Order Manager Last Name"
            />
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
