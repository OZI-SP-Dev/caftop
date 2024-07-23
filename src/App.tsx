import { useContext, useState, SyntheticEvent } from "react";
import { CAFTOPFinalStep, CAFTOPWizardSteps } from "./Steps/Steps";
import { AppHeader } from "./components/AppHeader";
import { globalContext } from "./stateManagement/GlobalStore";
import { AlertModal } from "./Steps/AlertModal";
import { AppLeftNav } from "./components/AppLeftNav";
import { CAFTOPError } from "./utilities/Utilities";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  Button,
  DialogBody,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Spinner,
} from "@fluentui/react-components";
import "./App.css";

function App() {
  const { globalState, dispatch } = useContext(globalContext);
  const [isLoading, _setLoading] = useState(false);
  const [isChecking, setChecking] = useState(false);
  const [errors, setErrors] = useState([] as CAFTOPError[]);

  let submitButtonText: string;
  if (isLoading) {
    submitButtonText = "Generating Document...";
  } else {
    switch (globalState.wizardStep) {
      case CAFTOPFinalStep:
        submitButtonText = "Generate Document";
        break;
      case 0:
        submitButtonText = "Start CAFTOP";
        break;
      default:
        submitButtonText = "Save and Continue";
    }
  }

  function handleAlert(accept: boolean) {
    setChecking(false);
    if (accept) {
      dispatch({ type: "PURGE_STATE" });
    }
  }

  // TODO: update to use ResetAlert
  function handleReset(_e: SyntheticEvent<HTMLButtonElement, MouseEvent>) {
    setChecking(true);
  }

  return (
    <div className="appContainer">
      <div className="appHeader">
        <AppHeader />
      </div>
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
            <CAFTOPWizardSteps currentStep={globalState.wizardStep} />
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
              disabled={isLoading}
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
          <Button
            appearance="secondary"
            type="reset"
            disabled={isLoading}
            style={{ color: "red", outlineColor: "red" }}
            onClick={(e) => handleReset(e)}
          >
            {globalState.wizardStep === CAFTOPFinalStep
              ? "Close and Reset"
              : "Reset"}
          </Button>
        </div>
      </div>

      <AlertModal show={isChecking} close={handleAlert} />
      <Dialog
        open={errors.length > 0}
        onOpenChange={(_evt, data) => {
          if (data.open === false) () => setErrors([]);
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Incomplete data found!</DialogTitle>
            <DialogContent>
              Resolve the following issues:
              <ul>
                {errors.map((error, i: number) => (
                  <li key={i}>
                    {error.errortext} in CAFTOP {error.caftopindex + 1}
                  </li>
                ))}
              </ul>
              Click outside this box to continue
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}

export default App;
