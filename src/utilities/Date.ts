/** Format the date as dd MMM yyyy (ex: 01 January 2024)
 *
 * @returns A string formatted as dd MMM yyyy
 */
export const formatDate = (date?: Date) => {
  return date
    ? date.toLocaleDateString("en-US", { day: "2-digit" }) +
        " " +
        date.toLocaleDateString("en-US", { month: "long" }) +
        " " +
        date.toLocaleDateString("en-US", { year: "numeric" })
    : "";
};
