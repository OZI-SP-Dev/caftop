import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers";
import { z } from "zod";

// Generate the type definition from the Zod rules
type ProgramManagers = z.infer<typeof ProgramManagersRuleFinal>;

export type CAFTOPInfo = {
  ProgramGroup: string;
  ProgramName: string;
  ProgramElementCode: string;
  LeadCommand: string;
  PreparingBase: string;
  PreparingOffice: string;
} & ProgramManagers;
