import { DateValue } from "@mantine/dates";

export const formatDate = (date?: DateValue | string | number): string => {
  if (date) {
    const dt = new Date(date);
    const y = dt.getFullYear().toString();
    const m = (dt.getMonth() + 1).toString().padStart(2, "0");
    const d = dt.getDate().toString().padStart(2, "0");
    return `${d}/${m}/${y}`;
  }
  return "";
};
