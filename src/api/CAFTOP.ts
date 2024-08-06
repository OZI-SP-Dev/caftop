import { ProgramManagersRuleFinal } from "Steps/Info/Fields/ProgramManagers";
import { TechOrderManagerRuleFinal } from "Steps/Info/Fields/TechOrderManager";
import { z } from "zod";

// Generate the type definition from the Zod rules
type ProgramManagers = z.infer<typeof ProgramManagersRuleFinal>;
type TechOrderManager = z.infer<typeof TechOrderManagerRuleFinal>;

export type CAFTOPInfo = {
  ProgramGroup: string;
  ProgramName: string;
  ProgramElementCode: string;
  LeadCommand: string;
  Center: string;
  PreparingBase: string;
  PreparingOffice: string;
} & ProgramManagers &
  TechOrderManager;

export type CAFTOPDescription = {
  Description: string;
};
