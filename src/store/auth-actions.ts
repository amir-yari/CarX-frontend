import { AppDispatch } from "./store";
import { authActions } from "./auth-slice";

import axios from "axios";

const api = axios.create({
  baseURL: "https://carxapi-h5d5fhhbc4hpc5fc.eastus-01.azurewebsites.net",
});

export const fetchCarData = () => {
  return (dispatch: AppDispatch) => {
    api
      .get("", {})
      .then((res) => {
        dispatch(authActions.setAuth(res.data));
      })
      .catch((error) => {
        console.error("Failed to fetch token:", error);
      });
  };
};
