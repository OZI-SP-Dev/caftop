import { GenericStep } from "Steps/GenericStep";
import { ReactElement } from "react";
import { Info } from "Steps/Info/Info";

type WizardStep = {
  id: string;
  name: string;
  jsxObj: ReactElement;
};

export const WizardSteps: WizardStep[] = [
  { id: "Home", name: "Home", jsxObj: <GenericStep /> },
  { id: "Info", name: "CAFTOP Information Page", jsxObj: <Info /> },
  {
    id: "Description",
    name: "Program Description and General Information",
    jsxObj: <GenericStep />,
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
  { id: "Completed", name: "Completed", jsxObj: <GenericStep /> },
];

export const CAFTOPStepNames = WizardSteps.map((step) => step.name);
export const CAFTOPFinalStep = CAFTOPStepNames.length - 1;

interface ICAFTOPWizardSteps {
  currentStep: number;
}

export const CAFTOPWizardSteps = (props: ICAFTOPWizardSteps) => {
  const stepToDisplay = WizardSteps[props.currentStep].jsxObj;

  return <>{stepToDisplay}</>;
};
