import {
  CAFTOPInfo,
  CAFTOPDescription,
  CAFTOPTechnicalOrders,
  CAFTOPLabor,
  CAFTOPDistribution,
  CAFTOPLRDP,
} from "api/CAFTOP";
import { Dispatch } from "react";

export interface GlobalStateInterface {
  Info: CAFTOPInfo;
  Description: CAFTOPDescription;
  TechnicalOrders: CAFTOPTechnicalOrders;
  Labor: CAFTOPLabor;
  Distribution: CAFTOPDistribution;
  LRDP: CAFTOPLRDP;
  wizardStep: number;
  wizardMaxStep: number;
  /** Drive how the "Save and Continue" button works -- page checking or full sumbission checking */
  mode: "save" | "submit";
}

export type ActionType = {
  type:
    | "MERGE_GLOBAL_OPTION"
    | "NEXT_STEP"
    | "PREV_STEP"
    | "GOTO_STEP"
    | "PURGE_STATE"
    | "CHANGE_MODE";
  payload?: Partial<GlobalStateInterface>;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
