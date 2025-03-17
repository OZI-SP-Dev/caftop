import { useContext, useState } from "react";
import { Button, Text } from "@fluentui/react-components";
import { globalContext } from "@stateManagement/GlobalStore";
import { CAFTOPStepNames } from "@steps/Steps";
import { useLocation } from "react-router-dom";
import { DeleteRegular } from "@fluentui/react-icons";
import {
  DeleteDialog,
  IDeleteItem,
} from "@src/components/DeleteDialog/DeleteDialog";
import { useMyRoles } from "@src/api/RolesApi";

export const AppLeftNav = () => {
  const { globalState } = useContext(globalContext);
  const location = useLocation();
  const myRoles = useMyRoles();

  const isNewCAFTOP = location.pathname === "/new";

  const steps = CAFTOPStepNames;

  const [itemToDelete, setItemToDelete] = useState<IDeleteItem>();

  return (
    <>
      <div style={{ display: "grid" }}>
        {!isNewCAFTOP && (
          <>
            <div>
              <Text>
                <strong>Program Name: </strong>
                {globalState.programName}
              </Text>
            </div>
            <div>
              <Text>
                <strong>PEC: </strong> {globalState.pec}
              </Text>
            </div>
          </>
        )}
        {steps.map((element, i) => (
          <Button
            id={`goto_${i}`}
            key={element}
            disabled={globalState.wizardMaxStep < i}
            type="submit"
            form="innerForm"
            appearance={
              globalState.wizardStep === i
                ? "primary"
                : globalState.wizardMaxStep >= i
                ? "secondary"
                : "outline"
            }
            style={
              globalState.wizardMaxStep >= i && globalState.wizardStep !== i
                ? { backgroundColor: "green", color: "white" }
                : undefined
            }
          >
            {element}
          </Button>
        ))}
        {myRoles.data?.isAdmin && (
          <Button
            aria-label="Delete"
            icon={<DeleteRegular />}
            onClick={(ev) => {
              ev.stopPropagation();
              setItemToDelete({
                Id: globalState.id,
                programName: globalState.programName,
                pec: globalState.pec,
                returnPath: "/", // Return to the Homepage, as the item will be deleted
              });
            }}
          >
            Delete
          </Button>
        )}
      </div>
      <DeleteDialog
        itemToDelete={{ ...itemToDelete }}
        setItemToDelete={setItemToDelete}
      />
    </>
  );
};
