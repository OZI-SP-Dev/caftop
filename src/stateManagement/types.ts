import { CAFTOPInfo } from "api/CAFTOP";
import { Dispatch } from "react";

export interface GlobalStateInterface {
  Info: CAFTOPInfo;
  wizardStep: number;
  wizardMaxStep: number;
}

export type ActionType = {
  type: string;
  payload?: Partial<GlobalStateInterface>;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
