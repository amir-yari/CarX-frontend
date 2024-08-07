import { AppDispatch } from "./store";
import { carActions } from "./car-slice";

import axios from "axios";

const api = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

export const fetchCarData = (
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  return (dispatch: AppDispatch) => {
    api
      .get("/api/v1/cars")
      .then((res) => {
        dispatch(carActions.setCars(res.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch car data:", error);
      });
  };
};

export const fetchCarDataById = (
  carId: string,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  return (dispatch: AppDispatch) => {
    api
      .get(`/api/v1/cars/${carId}`)
      .then((res) => {
        dispatch(carActions.setCar(res.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch car data:", error);
      });
  };
};
