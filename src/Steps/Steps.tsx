import { CAFTOPPage, Pages } from "api/CAFTOP/types";
import {
  ReactElement,
  Suspense,
  lazy,
  cloneElement,
  useContext,
  BaseSyntheticEvent,
  useState,
  useEffect,
} from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { globalContext } from "stateManagement/GlobalStore";
import { AlertNavWithErrors } from "./AlertNavWithErrors";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";
import { useParams } from "react-router-dom";
import { useUpdateCAFTOP } from "api/CAFTOP/useUpdateCAFTOP";
import { useQueryClient } from "@tanstack/react-query";

type WizardStep = {
  id: Pages;
  name: string;
  jsxObj: ReactElement;
};

export interface ICAFTOPWizardStep {
  handleSubmit: SubmitHandler<CAFTOPPage>;
  handleError: SubmitErrorHandler<CAFTOPPage>;
}

// Begin module downloads immediately, but still utilize lazy() for code splitting
const infoPromise = import("Steps/Info/Info");
const Info = lazy(() => infoPromise);

const descriptionPromise = import("Steps/Description/Description");
const Description = lazy(() => descriptionPromise);

const technicalOrdersPromise = import("Steps/TechnicalOrders/TechnicalOrders");
const TechnicalOrders = lazy(() => technicalOrdersPromise);

const laborPromise = import("Steps/Labor/Labor");
const Labor = lazy(() => laborPromise);

const distributionPromise = import("Steps/Distribution/Distribution");
const Distribution = lazy(() => distributionPromise);

const improvementsPromise = import("Steps/Improvements/Improvements");
const Improvements = lazy(() => improvementsPromise);

const lrdpPromise = import("Steps/LRDP/LRDP");
const LRDP = lazy(() => lrdpPromise);

const genericStepPromise = import("Steps/GenericStep");
const GenericStep = lazy(() => genericStepPromise);

const completePromise = import("Steps/Complete");
const Complete = lazy(() => completePromise);

const blankHandleErr: SubmitErrorHandler<CAFTOPPage> = (
  _errors,
  _e?: BaseSyntheticEvent
) => {};

const blankHandleSubmit = () => {};

const blankdHandlers = {
  handleSubmit: blankHandleSubmit,
  handleError: blankHandleErr,
};
export const WizardSteps: WizardStep[] = [
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
    id: "TechnicalOrders",
    name: "Technical Orders",
    jsxObj: <TechnicalOrders {...blankdHandlers} />,
  },
  {
    id: "Labor",
    name: "Labor",
    jsxObj: <Labor {...blankdHandlers} />,
  },
  {
    id: "Distribution",
    name: "Distribution",
    jsxObj: <Distribution {...blankdHandlers} />,
  },
  {
    id: "Improvements",
    name: "Improvements",
    jsxObj: <Improvements {...blankdHandlers} />,
  },
  {
    id: "LRDP",
    name: "Logistics Requirements Destermination Process (LRDP) Task Prioritization",
    jsxObj: <LRDP {...blankdHandlers} />,
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
  const { itemId } = useParams();
  const maxStep = useCAFTOP(globalState.id, "MaxStep");
  const queryClient = useQueryClient();
  const updateCAFTOP = useUpdateCAFTOP(
    itemId,
    WizardSteps[props.currentStep].id
  );

  useEffect(() => {
    const value = maxStep.data?.wizardMaxStep ?? 0;
    dispatch({
      type: "SET_MAX_STEP",
      payload: { wizardMaxStep: value },
    });
  }, [maxStep.data, dispatch]);

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_ITEM",
      payload: { id: parseInt(itemId ?? "0") },
    });
    void queryClient.invalidateQueries(["caftop-MaxStep"]);
  }, [itemId, dispatch, queryClient]);

  const handleSubmit: SubmitHandler<CAFTOPPage> = async (data, e) => {
    e?.preventDefault();
    if (e?.nativeEvent instanceof SubmitEvent) {
      if (e.nativeEvent?.submitter?.id === "next") {
        if (props.currentStep + 1 > (maxStep.data?.wizardMaxStep ?? 0)) {
          Object.assign(data, { wizardMaxStep: props.currentStep + 1 });
        }
        await updateCAFTOP.mutateAsync(data);
        dispatch({ type: "NEXT_STEP" });
      } else if (e.nativeEvent?.submitter?.id.startsWith("goto_")) {
        const gotoStep = parseInt(
          e.nativeEvent?.submitter?.id.replace("goto_", "")
        );
        await updateCAFTOP.mutateAsync(data);
        dispatch({ type: "GOTO_STEP", payload: { wizardStep: gotoStep } });
      } else {
        await updateCAFTOP.mutateAsync(data);
        dispatch({ type: "PREV_STEP" });
      }
    }
    return Promise.resolve();
  };

  const handleError: SubmitErrorHandler<CAFTOPPage> = (
    errors,
    e?: BaseSyntheticEvent
  ) => {
    // TODO -- Remove this
    if (errors) {
      console.log(errors);
    }
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
