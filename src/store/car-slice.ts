import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Car = {
  id: number;
  make: string;
  model: string;
  carYear: number;
  vehicleType: string;
  transmission: string;
  millageIncludedKM: number;
  price: number;
  fuelType: string;
  "image-path": string[];
  location: {
    lat: string;
    lng: string;
    city: string;
    country: string;
  };
  trips: {
    avgRate: number;
    tripCount: number;
  };
};

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
