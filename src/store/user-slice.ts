import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
};

const initialState: User = {
  name: "",
  email: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    loginUser(state, action: PayloadAction<User>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
