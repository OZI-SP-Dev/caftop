import { useContext, useState } from "react";
import { CAFTOPFinalStep, CAFTOPWizardSteps } from "Steps/Steps";
import { globalContext } from "stateManagement/GlobalStore";
import { AppLeftNav } from "components/AppLeftNav";

import { Button, Spinner } from "@fluentui/react-components";
import "./CAFTOP.css";

function CAFTOP() {
  const { globalState, dispatch } = useContext(globalContext);
  const [isLoading, _setLoading] = useState(false);
  // This will become true, only if we are on the last step, and we have valid data
  const [readyForGeneration, setReadyForGeneration] = useState(false);

  let submitButtonText: string;
  if (isLoading) {
    submitButtonText = "Generating Document...";
  } else {
    switch (globalState.wizardStep) {
      case CAFTOPFinalStep:
        submitButtonText = "Generate Document";
        break;
      default:
        submitButtonText = "Save and Continue";
    }
  }

  return (
    <div className="caftopContainer">
      <div className="navBar">
        <AppLeftNav />
      </div>
      <div className="formContainer">
        <div className="formContent">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CAFTOPWizardSteps
              currentStep={globalState.wizardStep}
              setReadyForGeneration={setReadyForGeneration}
            />
          </div>
        </div>
        <div className="formButtons">
          <Button
            id="prev"
            appearance="secondary"
            className="ms-auto"
            disabled={isLoading || globalState.wizardStep === 0}
            type="submit"
            form="innerForm"
          >
            Previous Step
          </Button>
          {
            <Button
              id="next"
              appearance="primary"
              type="submit"
              form="innerForm"
              disabled={
                isLoading ||
                (CAFTOPFinalStep === globalState.wizardStep &&
                  !readyForGeneration)
              }
              onClick={(e) => {
                if (submitButtonText === "Start CAFTOP") {
                  e.preventDefault();
                  dispatch({ type: "NEXT_STEP" });
                }
              }}
            >
              <>
                {isLoading === true && <Spinner size="tiny" />}
                {submitButtonText}
              </>
            </Button>
          }
          <div className="vr" />
        </div>
      </div>
    </div>
  );
}

export default CAFTOP;
