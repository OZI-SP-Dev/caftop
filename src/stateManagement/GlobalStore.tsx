import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from "react";
import Reducer from "stateManagement/reducer";
import { ContextType, GlobalStateInterface } from "stateManagement/types";
import { initialState } from "stateManagement/reducer";

function initializeState() {
  const fromLocalStorage: GlobalStateInterface = JSON.parse(
    localStorage.getItem("caftopGlobalState") as string
  ) as GlobalStateInterface;

  // Convert the date string back to a Date object
  if (fromLocalStorage?.Labor?.ContractorSupport?.ContractExpiration) {
    fromLocalStorage.Labor.ContractorSupport.ContractExpiration = new Date(
      fromLocalStorage.Labor.ContractorSupport.ContractExpiration
    );
  }

  // Convert the date string back to a Date object
  if (fromLocalStorage?.TechnicalOrders?.ApprovedWaiverDate) {
    fromLocalStorage.TechnicalOrders.ApprovedWaiverDate = new Date(
      fromLocalStorage.TechnicalOrders.ApprovedWaiverDate
    );
  }

  // Convert the date string back to a Date object
  if (fromLocalStorage?.Distribution?.ApprovedWaiverDate) {
    fromLocalStorage.Distribution.ApprovedWaiverDate = new Date(
      fromLocalStorage.Distribution.ApprovedWaiverDate
    );
  }

  // Return back to save mode on reload of page
  if (fromLocalStorage?.mode) {
    fromLocalStorage.mode = "save";
  }

  return fromLocalStorage || initialState;
}

export function GlobalStore({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [globalState, dispatch] = useReducer(Reducer, initializeState());
  const initialRenderGlobalState = useRef(true);

  useEffect(() => {
    if (initialRenderGlobalState.current) {
      initialRenderGlobalState.current = false;
    } else {
      localStorage.setItem("caftopGlobalState", JSON.stringify(globalState));
    }
  }, [globalState]);

  return (
    <globalContext.Provider value={{ globalState, dispatch }}>
      {children}
    </globalContext.Provider>
  );
}

export const globalContext = createContext({} as ContextType);
