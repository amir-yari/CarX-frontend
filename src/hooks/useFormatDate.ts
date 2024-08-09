import { useMemo } from "react";

const useFormatDate = (dateString: string) => {
  const formattedDate = useMemo(() => {
    const date = new Date(dateString);

    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${dayOfWeek}, ${month} ${day} at ${hours}:${minutes}`;
  }, [dateString]);

  return formattedDate;
};

export default useFormatDate;
