import { userActions } from "./user-slice";
import { AppDispatch } from "./store";

import axios from "axios";

const api = axios.create({
  baseURL: "",
});

export const login = (email: string, password: string) => {
  return () => {
    return api.post("/api/v1/auth/login", { email, password });
  };
};

export const googleLogin = () => {
  return async () => {
    const googleLoginURL = "/api/v1/auth/google";
    const newWindow = window.open(googleLoginURL, "_blank");
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    api
      .get("/api/v1/auth/logout")
      .then((res) => {
        dispatch(userActions.logoutUser());
        console.log(res.status);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  };
};

export const signup = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return () => {
    return api
      .post("/api/v1/auth/signup", { email, password, firstName, lastName })
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  };
};

export const fetchUserData = () => {
  return (dispatch: AppDispatch) => {
    api
      .get("/api/v1/me")
      .then((res) => {
        console.log(res.data);
        dispatch(userActions.setUser(res.data));
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  };
};

export const postUserData = () => {
  return () => {
    api
      .post("/api/v1/")
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.error("Failed to post user data:", error);
      });
  };
};
