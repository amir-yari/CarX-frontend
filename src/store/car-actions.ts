import { AppDispatch } from "./store";
import { carActions } from "./car-slice";

import axios from "axios";

const api = axios.create({
  baseURL: "https://carxapi-h5d5fhhbc4hpc5fc.eastus-01.azurewebsites.net",
});

export const fetchCarData = (
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  return (dispatch: AppDispatch) => {
    api
      .get("/api/v1/cars", {})
      .then((res) => {
        dispatch(carActions.setCars(res.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch car data:", error);
      });
  };
};
