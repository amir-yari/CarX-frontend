import { useMemo } from "react";

const useCalculatePeriod = (startDate: string, endDate: string): number => {
  return useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const diffMs = end.getTime() - start.getTime();

    // Convert milliseconds to days
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    // Round up if there's any fraction of a day
    return Math.ceil(diffDays);
  }, [startDate, endDate]);
};

export default useCalculatePeriod;
