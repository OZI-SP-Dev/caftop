import { createContext, ReactElement, ReactNode, useReducer } from "react";
import Reducer from "stateManagement/reducer";
import { ContextType } from "stateManagement/types";
import { initialState } from "stateManagement/reducer";

export function GlobalStore({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [globalState, dispatch] = useReducer(Reducer, initialState);

  return (
    <globalContext.Provider value={{ globalState, dispatch }}>
      {children}
    </globalContext.Provider>
  );
}

export const globalContext = createContext({} as ContextType);
