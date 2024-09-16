import { z } from "zod";

const finalRule = z.string().trim().min(1, "You must enter a Introduction");

export const IntroductionRuleFinal = z.object({
  Introduction: finalRule,
});
