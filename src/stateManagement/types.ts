import { CAFTOPInfo } from "api/CAFTOP";
import { Dispatch } from "react";

export interface GlobalStateInterface {
  Info: CAFTOPInfo;
  wizardStep: number;
  wizardMaxStep: number;
}

export type ActionType = {
  type:
    | "MERGE_GLOBAL_OPTION"
    | "NEXT_STEP"
    | "PREV_STEP"
    | "GOTO_STEP"
    | "PURGE_STATE";
  payload?: Partial<GlobalStateInterface>;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
