import { AppDispatch } from "./store";
import { carActions } from "./car-slice";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

export const fetchCarData = () => {
  return (dispatch: AppDispatch) => {
    axiosInstance
      .get("/api/v1/cars", {})
      .then((res) => {
        dispatch(carActions.setCars(res.data));
      })
      .catch((error) => {
        console.error("Failed to fetch car data:", error);
      });
  };
};
