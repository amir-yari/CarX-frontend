import { AppDispatch } from "./store";
import { carActions } from "./car-slice";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

export const fetchCarData = () => {
  return (dispatch: AppDispatch) => {
    axiosInstance
      .get("/api/v1/cars", {
        params: {
          endDate: "12/11/2024",
          startDate: "12/12/2024",
          options: "aux,heater,air conditionning",
        },
      })
      .then((res) => {
        dispatch(carActions.setCars(res.data));
      })
      .catch((error) => {
        console.error("Failed to fetch car data:", error);
      });
  };
};
