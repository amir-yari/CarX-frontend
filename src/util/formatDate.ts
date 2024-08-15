import dayjs from "dayjs";

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("YYYY-MM-DD HH:mm");
};

export const getTodayDate = (): string => {
  return dayjs().format("YYYY-MM-DD HH:mm");
};

export const getTomorrowDate = (): string => {
  return dayjs().add(3, "day").format("YYYY-MM-DD HH:mm");
};
