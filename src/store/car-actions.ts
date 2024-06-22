import { AppDispatch } from "./store";
import { carActions } from "./car-slice";
import axios from "axios";

export const fetchCarData = () => {
  return (dispatch: AppDispatch) => {
    axios
      .get("http://localhost:3000/api/v1/cars")
      .then((res) => {
        dispatch(carActions.setCars(res.data));
      })
      .catch((error) => {
        console.error("Failed to fetch car data:", error);
      });
  };
};
