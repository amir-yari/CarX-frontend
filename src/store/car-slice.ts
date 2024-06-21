import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Car = { id: number; model: string; make: string; year: number };

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
