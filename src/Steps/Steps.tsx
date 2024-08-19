import { CAFTOPDescription, CAFTOPInfo } from "api/CAFTOP";
import {
  ReactElement,
  Suspense,
  lazy,
  cloneElement,
  useContext,
  BaseSyntheticEvent,
  useState,
} from "react";
import { SubmitErrorHandler } from "react-hook-form";
import { globalContext } from "stateManagement/GlobalStore";
import { AlertNavWithErrors } from "./AlertNavWithErrors";

type WizardStep = {
  id: string;
  name: string;
  jsxObj: ReactElement;
};

export interface ICAFTOPWizardStep {
  handleSubmit: (e?: BaseSyntheticEvent) => void;
  handleError: SubmitErrorHandler<CAFTOPInfo | CAFTOPDescription>;
}

// Begin module downloads immediately, but still utilize lazy() for code splitting
const infoPromise = import("Steps/Info/Info");
const Info = lazy(() => infoPromise);

const descriptionPromise = import("Steps/Description/Description");
const Description = lazy(() => descriptionPromise);

const genericStepPromise = import("Steps/GenericStep");
const GenericStep = lazy(() => genericStepPromise);

const completePromise = import("Steps/Complete");
const Complete = lazy(() => completePromise);

const blankHandleErr: SubmitErrorHandler<CAFTOPInfo | CAFTOPDescription> = (
  _errors,
  _e?: BaseSyntheticEvent
) => {};

const blankHandleSubmit = () => {};

const blankdHandlers = {
  handleSubmit: blankHandleSubmit,
  handleError: blankHandleErr,
};
export const WizardSteps: WizardStep[] = [
  { id: "Home", name: "Home", jsxObj: <GenericStep {...blankdHandlers} /> },
  {
    id: "Info",
    name: "CAFTOP Information Page",
    jsxObj: <Info {...blankdHandlers} />,
  },
  {
    id: "Description",
    name: "Program Description and General Information",
    jsxObj: <Description {...blankdHandlers} />,
  },
  {
    id: "Labor",
    name: "Labor",
    jsxObj: <GenericStep {...blankdHandlers} />,
  },
  {
    id: "Distribution",
    name: "Distribution",
    jsxObj: <GenericStep {...blankdHandlers} />,
  },
  {
    id: "Improvements",
    name: "Improvements",
    jsxObj: <GenericStep {...blankdHandlers} />,
  },
  {
    id: "ReqSummary",
    name: "Requirements Summary",
    jsxObj: <GenericStep {...blankdHandlers} />,
  },
  {
    id: "LRDP",
    name: "Logistics Requirements Destermination Process (LRDP) Task Prioritization",
    jsxObj: <GenericStep {...blankdHandlers} />,
  },
  {
    id: "Approvals",
    name: "Program Approvals",
    jsxObj: <GenericStep {...blankdHandlers} />,
  },
  {
    id: "Completed",
    name: "Completed",
    jsxObj: <Complete {...blankdHandlers} />,
  },
];

export const CAFTOPStepNames = WizardSteps.map((step) => step.name);
export const CAFTOPFinalStep = CAFTOPStepNames.length - 1;

interface ICAFTOPWizardSteps {
  currentStep: number;
}

export const CAFTOPWizardSteps = (props: ICAFTOPWizardSteps) => {
  const { globalState, dispatch } = useContext(globalContext);
  const [isNavErr, setNavErr] = useState<boolean>(false);
  const [closeFunc, setCloseFunc] = useState<() => void>(() => {});
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (e?.nativeEvent instanceof SubmitEvent) {
      if (e.nativeEvent?.submitter?.id === "next") {
        dispatch({ type: "NEXT_STEP" });
      } else if (e.nativeEvent?.submitter?.id.startsWith("goto_")) {
        const gotoStep = parseInt(
          e.nativeEvent?.submitter?.id.replace("goto_", "")
        );
        dispatch({ type: "GOTO_STEP", payload: { wizardStep: gotoStep } });
      } else {
        dispatch({ type: "PREV_STEP" });
      }
    }
    return Promise.resolve();
  };

  const handleError: SubmitErrorHandler<CAFTOPInfo | CAFTOPDescription> = (
    _errors,
    e?: BaseSyntheticEvent
  ) => {
    if (e) {
      e.preventDefault();
      if (e?.nativeEvent instanceof SubmitEvent) {
        if (e.nativeEvent?.submitter?.id === "next") {
          if (globalState.wizardStep === globalState.wizardMaxStep) {
            // They can't move to the next stage if they haven't entered valid data on this screen yet
            return Promise.resolve();
          } else {
            setCloseFunc(() => () => dispatch({ type: "NEXT_STEP" }));
          }
        } else if (
          e?.nativeEvent instanceof SubmitEvent &&
          e.nativeEvent?.submitter?.id.startsWith("goto_")
        ) {
          const gotoStep = parseInt(
            e.nativeEvent?.submitter?.id.replace("goto_", "")
          );
          setCloseFunc(
            () => () =>
              dispatch({ type: "GOTO_STEP", payload: { wizardStep: gotoStep } })
          );
        } else {
          setCloseFunc(() => () => dispatch({ type: "PREV_STEP" }));
        }
      }
      setNavErr(true);
      return Promise.resolve();
    }
  };

  const stepToDisplay = WizardSteps[props.currentStep].jsxObj;
  const step = cloneElement(stepToDisplay, { handleSubmit, handleError });

  return (
    <Suspense fallback={<div style={{ paddingLeft: ".5em" }}>Loading...</div>}>
      {step}
      <AlertNavWithErrors
        show={isNavErr}
        close={(choice) => {
          setNavErr(false);
          if (choice) {
            closeFunc();
          }
        }}
      />
    </Suspense>
  );
};
