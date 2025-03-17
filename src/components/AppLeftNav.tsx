import { useContext } from "react";
import { Button, Text } from "@fluentui/react-components";
import { globalContext } from "@stateManagement/GlobalStore";
import { CAFTOPStepNames } from "@steps/Steps";
import { useLocation } from "react-router-dom";

export const AppLeftNav = () => {
  const { globalState } = useContext(globalContext);
  const location = useLocation();

  const isNewCAFTOP = location.pathname === "/new";

  const steps = CAFTOPStepNames;

  return (
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
    </div>
  );
};
