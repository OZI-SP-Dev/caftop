import { Dispatch } from "react";

export interface GlobalStateInterface {
  id: number;
  wizardStep: number;
  wizardMaxStep: number;
  /** Drive how the "Save and Continue" button works -- page checking or full sumbission checking */
  mode: "save" | "submit";
}

export type ActionType = {
  type:
    | "NEXT_STEP"
    | "PREV_STEP"
    | "GOTO_STEP"
    | "CHANGE_MODE"
    | "SET_CURRENT_ITEM"
    | "SET_MAX_STEP";
  payload?: Partial<GlobalStateInterface>;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
