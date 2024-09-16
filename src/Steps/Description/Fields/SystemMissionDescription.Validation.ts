import { z } from "zod";

const baseRule = z.string().trim();

export const systemmissiondescriptionRuleSave = z.object({
  SystemMissionDescription: baseRule,
});

export const systemmissiondescriptionRuleFinal = z.object({
  SystemMissionDescription: baseRule.min(
    1,
    "You must enter a System/Mission Description"
  ),
});
