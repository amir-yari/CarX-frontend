import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Auth = { token: string };

const initialState: Auth = { token: "" };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth>) {
      state.token = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
