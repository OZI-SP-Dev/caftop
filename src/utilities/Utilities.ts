import { GlobalStateInterface } from "stateManagement/types";

export interface CAFTOPError {
  errortext: string;
  caftopindex: number;
}

export function CheckComplete(globalState: GlobalStateInterface) {
  const errors = [] as CAFTOPError[];

  // TODO -- Check requirements are met
  console.log(globalState);

  return errors;
}
