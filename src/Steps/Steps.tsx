import {
  ReactElement,
  Suspense,
  lazy,
  cloneElement,
  useContext,
  BaseSyntheticEvent,
} from "react";
import { globalContext } from "stateManagement/GlobalStore";

type WizardStep = {
  id: string;
  name: string;
  jsxObj: ReactElement;
};

export interface ICAFTOPWizardStep {
  handleSubmit: (e?: BaseSyntheticEvent) => void;
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

export const WizardSteps: WizardStep[] = [
  { id: "Home", name: "Home", jsxObj: <GenericStep handleSubmit={() => {}} /> },
  {
    id: "Info",
    name: "CAFTOP Information Page",
    jsxObj: <Info handleSubmit={() => {}} />,
  },
  {
    id: "Description",
    name: "Program Description and General Information",
    jsxObj: <Description handleSubmit={() => {}} />,
  },
  {
    id: "Labor",
    name: "Labor",
    jsxObj: <GenericStep handleSubmit={() => {}} />,
  },
  {
    id: "Distribution",
    name: "Distribution",
    jsxObj: <GenericStep handleSubmit={() => {}} />,
  },
  {
    id: "Improvements",
    name: "Improvements",
    jsxObj: <GenericStep handleSubmit={() => {}} />,
  },
  {
    id: "ReqSummary",
    name: "Requirements Summary",
    jsxObj: <GenericStep handleSubmit={() => {}} />,
  },
  {
    id: "LRDP",
    name: "Logistics Requirements Destermination Process (LRDP) Task Prioritization",
    jsxObj: <GenericStep handleSubmit={() => {}} />,
  },
  {
    id: "Approvals",
    name: "Program Approvals",
    jsxObj: <GenericStep handleSubmit={() => {}} />,
  },
  {
    id: "Completed",
    name: "Completed",
    jsxObj: <Complete handleSubmit={() => {}} />,
  },
];

export const CAFTOPStepNames = WizardSteps.map((step) => step.name);
export const CAFTOPFinalStep = CAFTOPStepNames.length - 1;

interface ICAFTOPWizardSteps {
  currentStep: number;
}

export const CAFTOPWizardSteps = (props: ICAFTOPWizardSteps) => {
  const { dispatch } = useContext(globalContext);
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (
      e?.nativeEvent instanceof SubmitEvent &&
      e.nativeEvent?.submitter?.id === "next"
    ) {
      dispatch({ type: "NEXT_STEP" });
    } else if (
      e?.nativeEvent instanceof SubmitEvent &&
      e.nativeEvent?.submitter?.id.startsWith("goto_")
    ) {
      const gotoStep = parseInt(
        e.nativeEvent?.submitter?.id.replace("goto_", "")
      );
      dispatch({ type: "GOTO_STEP", payload: { wizardStep: gotoStep } });
    } else {
      dispatch({ type: "PREV_STEP" });
    }
    return Promise.resolve();
  };

  const stepToDisplay = WizardSteps[props.currentStep].jsxObj;
  const step = cloneElement(stepToDisplay, { handleSubmit });

  return (
    <Suspense fallback={<div style={{ paddingLeft: ".5em" }}>Loading...</div>}>
      {step}
    </Suspense>
  );
};
