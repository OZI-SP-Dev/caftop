import { ActionType, GlobalStateInterface } from "stateManagement/types";
import {
  Description,
  Distribution,
  Improvements,
  Info,
  LRDP,
  Labor,
  TechnicalOrders,
} from "api/CAFTOP/defaults";

export const initialState: GlobalStateInterface = {
  Info,
  Description,
  TechnicalOrders,
  Labor,
  Distribution,
  Improvements,
  LRDP,
  wizardStep: 0,
  wizardMaxStep: 0,
  mode: "save",
};

const Reducer = (state: GlobalStateInterface, action: ActionType) => {
  switch (action.type) {
    case "MERGE_GLOBAL_OPTION": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "NEXT_STEP": {
      let wizardMaxStep = state.wizardMaxStep;
      if (wizardMaxStep <= state.wizardStep) {
        wizardMaxStep = state.wizardStep + 1;
      }
      return {
        ...state,
        wizardStep: state.wizardStep + 1,
        wizardMaxStep,
      };
    }
    case "PREV_STEP": {
      return {
        ...state,
        wizardStep: state.wizardStep - 1,
      };
    }
    case "GOTO_STEP": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "CHANGE_MODE": {
      let mode = state.mode;
      mode = action.payload?.mode ?? mode;
      return {
        ...state,
        mode,
      };
    }
    default: {
      return state;
    }
  }
};

export default Reducer;
