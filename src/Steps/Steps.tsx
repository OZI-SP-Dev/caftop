import { ReactElement, Suspense, lazy } from "react";

type WizardStep = {
  id: string;
  name: string;
  jsxObj: ReactElement;
};

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
  { id: "Home", name: "Home", jsxObj: <GenericStep /> },
  { id: "Info", name: "CAFTOP Information Page", jsxObj: <Info /> },
  {
    id: "Description",
    name: "Program Description and General Information",
    jsxObj: <Description />,
  },
  {
    id: "Labor",
    name: "Labor",
    jsxObj: <GenericStep />,
  },
  { id: "Distribution", name: "Distribution", jsxObj: <GenericStep /> },
  { id: "Improvements", name: "Improvements", jsxObj: <GenericStep /> },
  { id: "ReqSummary", name: "Requirements Summary", jsxObj: <GenericStep /> },
  {
    id: "LRDP",
    name: "Logistics Requirements Destermination Process (LRDP) Task Prioritization",
    jsxObj: <GenericStep />,
  },
  {
    id: "Approvals",
    name: "Program Approvals",
    jsxObj: <GenericStep />,
  },
  { id: "Completed", name: "Completed", jsxObj: <Complete /> },
];

export const CAFTOPStepNames = WizardSteps.map((step) => step.name);
export const CAFTOPFinalStep = CAFTOPStepNames.length - 1;

interface ICAFTOPWizardSteps {
  currentStep: number;
}

export const CAFTOPWizardSteps = (props: ICAFTOPWizardSteps) => {
  const stepToDisplay = WizardSteps[props.currentStep].jsxObj;

  return (
    <Suspense fallback={<div style={{ paddingLeft: ".5em" }}>Loading...</div>}>
      {stepToDisplay}
    </Suspense>
  );
};
