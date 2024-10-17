import { SyntheticEvent } from "react";

export const formatPhone = (phone: string) => {
  if (phone.match(/^([^\d]*\d){10}$/)) {
    // Match only if it has exactly 10 digits
    const justNumbers = phone.replace(/\D/g, ""); // Strip out non-digits
    return `(${justNumbers.slice(0, 3)}) ${justNumbers.slice(
      3,
      6
    )}-${justNumbers.slice(6)}`; // Return number formated as (###) ###-####
  }
  return phone; // Preserve string if we don't match
};

export const onPhoneBlur = (e: SyntheticEvent<HTMLInputElement>) => {
  e.currentTarget.value = formatPhone(e.currentTarget.value);
};
