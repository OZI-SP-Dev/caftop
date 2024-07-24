import { CAFTOPInfo } from "api/CAFTOP";
import { ActionType, GlobalStateInterface } from "stateManagement/types";

const Info: CAFTOPInfo = {
  ProgramGroup: "",
  ProgramName: "",
  ProgramElementCode: "",
  LeadCommand: "",
  PreparingBase: "",
  PreparingOffice: "",
  ProgramManagers: [{ FirstName: "", LastName: "", DSN: "", Email: "" }],
};

export const initialState: GlobalStateInterface = {
  Info,
  wizardStep: 0,
  wizardMaxStep: 0,
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
    case "PURGE_STATE": {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default Reducer;
