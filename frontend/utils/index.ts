import dayjs from "dayjs";
export const captalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const dateFormate = (str: string) =>
  dayjs(parseInt(str)).format("YYYY-MM-DD");
