import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import User from "../types/user";

const initialState: User = {
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logoutUser() {
      return initialState;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
