import { ActionType, GlobalStateInterface } from "stateManagement/types";

export const initialState: GlobalStateInterface = {
  id: 0,
  wizardStep: 0,
  wizardMaxStep: 0,
  mode: "save",
};

const Reducer = (state: GlobalStateInterface, action: ActionType) => {
  switch (action.type) {
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
    case "SET_CURRENT_ITEM": {
      const id = action.payload?.id ?? 0;
      let wizardMaxStep = state.wizardMaxStep;
      let wizardStep = state.wizardMaxStep;

      if (id === 0) {
        wizardMaxStep = 0;
        wizardStep = 0;
      }
      const mode: GlobalStateInterface["mode"] = "save";
      return {
        ...state,
        mode,
        id,
        wizardMaxStep,
        wizardStep,
      };
    }
    case "SET_MAX_STEP": {
      const wizardMaxStep = action.payload?.wizardMaxStep ?? 0;
      const wizardStep = wizardMaxStep;
      return {
        ...state,
        wizardMaxStep,
        wizardStep,
      };
    }
    default: {
      return state;
    }
  }
};

export default Reducer;
