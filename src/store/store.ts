import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./car-slice";

export const store = configureStore({
  reducer: { car: carSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
