import { ReactElement, ReactNode, useReducer } from "react";
import { globalContext } from "stateManagement/GlobalStore";
import Reducer from "stateManagement/reducer";
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
