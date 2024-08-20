import {
  CAFTOPInfo,
  CAFTOPDescription,
  CAFTOPTechnicalOrders,
} from "api/CAFTOP";
import { ActionType, GlobalStateInterface } from "stateManagement/types";

const Info: CAFTOPInfo = {
  ProgramGroup: "",
  ProgramName: "",
  ProgramElementCode: "",
  LeadCommand: "",
  Center: "",
  PreparingBase: "",
  PreparingOffice: "",
  ProgramManagers: [{ FirstName: "", LastName: "", DSN: "", Email: "" }],
  TechOrderManager: { FirstName: "", LastName: "", DSN: "", Email: "" },
};

export const Description: CAFTOPDescription = {
  Description: "",
  Introduction: "",
  LaborType: "",
  ContractorSupport: { LaborCost: "" },
  OrganicSupport: { Office: "" },
  ConfigurationPlan: "",
};

export const TechnicalOrders: CAFTOPTechnicalOrders = {
  NumElectronic: "",
  NumPaper: "",
  NumCDDVD: "",
  NumUnpublished: "",
  NumInAcquisition: "",
};

export const initialState: GlobalStateInterface = {
  Info,
  Description,
  TechnicalOrders,
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
    case "PURGE_STATE": {
      return initialState;
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
