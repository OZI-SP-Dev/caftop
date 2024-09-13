import { z } from "zod";

const baseRule = z.string().trim();

export const configurationplanRuleSave = z.object({
  ConfigurationPlan: baseRule,
});

export const configurationplanRuleFinal = z.object({
  ConfigurationPlan: baseRule.min(1, "You must enter a Configuration Plan"),
});
