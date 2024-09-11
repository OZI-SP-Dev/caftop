import { z } from "zod";

/** Funciton to replace the value in the data with the provided value
 * @param value The value which will replace the value in the data
 * @returns A ZodEffects object that transform the value from what it was to the value provided
 */
export const populateWithDefaultValue = <T>(value: T) => {
  return z.any().transform((_obj) => value);
};
