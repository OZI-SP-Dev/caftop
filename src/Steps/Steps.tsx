import { CAFTOPPage, Pages } from "api/CAFTOP/types";
import {
  Suspense,
  lazy,
  useContext,
  BaseSyntheticEvent,
  useState,
  useEffect,
} from "react";
import { SubmitErrorHandler } from "react-hook-form";
import { globalContext } from "stateManagement/GlobalStore";
import { AlertNavWithErrors } from "./AlertNavWithErrors";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";
import { useParams } from "react-router-dom";
import { useUpdateCAFTOP } from "api/CAFTOP/useUpdateCAFTOP";
import { useQueryClient } from "@tanstack/react-query";
import { AlertNav } from "./AlertNav";

type WizardStep = {
  id: Pages;
  name: string;
};

type TCAFTOPSubmitFunc = (
  hasChanges: boolean,
  data: CAFTOPPage,
  e?: React.BaseSyntheticEvent
) => Promise<void>;

export interface ICAFTOPWizardStep {
  handleSubmit: TCAFTOPSubmitFunc;
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

const completePromise = import("Steps/Complete");
const Complete = lazy(() => completePromise);

const WizardSteps: WizardStep[] = [
  {
    id: "Info",
    name: "CAFTOP Information Page",
  },
  {
    id: "Description",
    name: "Program Description and General Information",
  },
  {
    id: "TechnicalOrders",
    name: "Technical Orders",
  },
  {
    id: "Labor",
    name: "Labor",
  },
  {
    id: "Distribution",
    name: "Distribution",
  },
  {
    id: "Improvements",
    name: "Improvements",
  },
  {
    id: "LRDP",
    name: "Logistics Requirements Destermination Process (LRDP) Task Prioritization",
  },
  {
    id: "Completed",
    name: "Completed",
  },
];

export const CAFTOPStepNames = WizardSteps.map((step) => step.name);
export const CAFTOPFinalStep = CAFTOPStepNames.length - 1;

interface ICAFTOPWizardSteps {
  currentStep: number;
  setReadyForGeneration: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CAFTOPWizardSteps = (props: ICAFTOPWizardSteps) => {
  const { globalState, dispatch } = useContext(globalContext);
  const [isNavErr, setNavErr] = useState<boolean>(false);
  const [isNavChanges, setNavChanges] = useState<boolean>(false);
  const [closeFunc, setCloseFunc] = useState(() => () => {});
  const [closeFuncChanges, setCloseFuncChanges] = useState(
    () => () => Promise.resolve()
  );
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

  const handleSubmit: TCAFTOPSubmitFunc = async (
    hasChanges: boolean,
    data: CAFTOPPage,
    e?: React.BaseSyntheticEvent
  ) => {
    let saveAction = () => Promise.resolve();
    let navAction = () => {};
    let isSaveAndContinue = false;
    e?.preventDefault();
    if (e?.nativeEvent instanceof SubmitEvent) {
      if (e.nativeEvent?.submitter?.id === "next") {
        isSaveAndContinue = globalState.wizardMaxStep === props.currentStep;
        saveAction = async () => {
          if (props.currentStep + 1 > (maxStep.data?.wizardMaxStep ?? 0)) {
            Object.assign(data, {
              wizardMaxStep: props.currentStep + 1,
            });
          }
          await updateCAFTOP.mutateAsync(data);
        };
        navAction = () => dispatch({ type: "NEXT_STEP" });
      } else if (e.nativeEvent?.submitter?.id.startsWith("goto_")) {
        const gotoStep = parseInt(
          e.nativeEvent?.submitter?.id.replace("goto_", "")
        );
        saveAction = async () => {
          await updateCAFTOP.mutateAsync(data);
        };
        navAction = () =>
          dispatch({ type: "GOTO_STEP", payload: { wizardStep: gotoStep } });
      } else {
        saveAction = async () => {
          await updateCAFTOP.mutateAsync(data);
        };
        navAction = () => dispatch({ type: "PREV_STEP" });
      }
    }
    if (hasChanges && !isSaveAndContinue) {
      setNavChanges(hasChanges);
      setCloseFuncChanges(() => saveAction);
      setCloseFunc(() => navAction);
    } else {
      if (saveAction) {
        await saveAction();
      }
      if (navAction) {
        navAction();
      }
      return Promise.resolve();
    }
  };

  const handleError: SubmitErrorHandler<CAFTOPPage> = (
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

  let step: JSX.Element = <></>;
  switch (WizardSteps[props.currentStep].id) {
    case "Info":
      step = <Info handleSubmit={handleSubmit} handleError={handleError} />;
      break;
    case "Description":
      step = (
        <Description handleSubmit={handleSubmit} handleError={handleError} />
      );
      break;
    case "Distribution":
      step = (
        <Distribution handleSubmit={handleSubmit} handleError={handleError} />
      );
      break;
    case "Improvements":
      step = (
        <Improvements handleSubmit={handleSubmit} handleError={handleError} />
      );
      break;
    case "LRDP":
      step = <LRDP handleSubmit={handleSubmit} handleError={handleError} />;
      break;
    case "Labor":
      step = <Labor handleSubmit={handleSubmit} handleError={handleError} />;
      break;
    case "TechnicalOrders":
      step = (
        <TechnicalOrders
          handleSubmit={handleSubmit}
          handleError={handleError}
        />
      );
      break;
    case "Completed":
      step = (
        <Complete
          handleSubmit={handleSubmit}
          handleError={handleError}
          setReadyForGeneration={props.setReadyForGeneration}
        />
      );
      break;
  }

  return (
    <Suspense fallback={<div style={{ paddingLeft: ".5em" }}>Loading...</div>}>
      {step}
      <AlertNav
        show={isNavChanges}
        close={async (choice) => {
          setNavChanges(false);
          if (choice) {
            await closeFuncChanges();
          }
          closeFunc();
          return Promise.resolve();
        }}
      />
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
