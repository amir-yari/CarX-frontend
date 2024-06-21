import { AppDispatch } from "./store";
import { carActions } from "./car-slice";

export const fetchCarData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/v1/cars");
      if (!response.ok) {
        throw new Error("Could not fetch car data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const carData = await fetchData();
      dispatch(carActions.setCars(carData));
    } catch (error) {
      console.error("Failed to fetch car data:", error);
    }
  };
};
