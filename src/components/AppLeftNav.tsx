import { useContext } from "react";
import { Button } from "@fluentui/react-components";
import { globalContext } from "../stateManagement/GlobalStore";
import { CAFTOPStepNames } from "../Steps/Steps";

export const AppLeftNav = () => {
  const { globalState, dispatch } = useContext(globalContext);
  const steps = CAFTOPStepNames;

  return (
    <div style={{ display: "grid" }}>
      {steps.map((element, i) => (
        <Button
          key={element}
          disabled={globalState.wizardMaxStep < i}
          appearance={
            globalState.wizardStep === i
              ? "primary"
              : globalState.wizardMaxStep >= i
              ? "secondary"
              : "outline"
          }
          style={
            globalState.wizardMaxStep >= i && globalState.wizardStep !== i
              ? { backgroundColor: "green" }
              : undefined
          }
          onClick={(_e) =>
            dispatch({ type: "GOTO_STEP", payload: { wizardStep: i } })
          }
        >
          {element}
        </Button>
      ))}
    </div>
  );
};
