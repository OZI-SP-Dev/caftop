import { useContext } from "react";
import { Button } from "@fluentui/react-components";
import { globalContext } from "../stateManagement/GlobalStore";
import { CAFTOPStepNames } from "../Steps/Steps";

export const AppLeftNav = () => {
  const { globalState } = useContext(globalContext);
  const steps = CAFTOPStepNames;

  return (
    <div style={{ display: "grid" }}>
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
