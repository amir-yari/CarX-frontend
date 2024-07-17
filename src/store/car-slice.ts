import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import Car from "../types/car";

type CarState = {
  items: Car[];
};

const initialState: CarState = {
  items: [],
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars(state, action: PayloadAction<Car[]>) {
      state.items = action.payload;
    },
  },
});

export const carActions = carSlice.actions;

export default carSlice;
