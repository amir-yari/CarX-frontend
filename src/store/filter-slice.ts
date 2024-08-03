import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Filter = {
  location: string;
  startDate: string;
  endDate: string;
  minPrice: number | null;
  maxPrice: number | null;
  type: string;
  make: string[];
  fuelType: string;
};

const initialState: Filter = {
  location: "",
  startDate: "",
  endDate: "",
  minPrice: null,
  maxPrice: null,
  type: "",
  make: [],
  fuelType: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filter>) {
      return { ...state, ...action.payload };
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
