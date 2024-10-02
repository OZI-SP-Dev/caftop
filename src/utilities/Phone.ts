import { SyntheticEvent } from "react";

export const formatPhone = (phone: string) => {
  let endsDash = false;
  let retVal = phone;
  if (phone.match(/-$/)) {
    endsDash = true;
  }
  retVal = phone.replace(/\D/g, "");
  const size = retVal.length;
  if (size > 3 || endsDash) {
    // If we have more than 3 numbers, or we have either (###) or (###) ###-
    // The second condition allows them to type a dash, otherwise the code would "reject" it
    retVal = "(" + retVal.slice(0, 3) + ") " + retVal.slice(3, 10);
  }
  if (size > 6 || (size > 5 && endsDash)) {
    retVal = retVal.slice(0, 9) + "-" + retVal.slice(9);
  }
  return retVal;
};

export const onPhoneInput = (e: SyntheticEvent<HTMLInputElement>) => {
  const formattedDSN = formatPhone(e.currentTarget.value);
  const start = e.currentTarget.selectionStart ?? 1;
  const length = e.currentTarget.value.length;
  e.currentTarget.value = formattedDSN;
  if (start < length) {
    e.currentTarget.setSelectionRange(start, start);
  }
};
