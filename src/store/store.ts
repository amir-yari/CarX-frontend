import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import carSlice from "./car-slice";
import filterSlice from "./filter-slice";
import userSlice from "./user-slice";
import modalSlice from "./modal-slice";

const rootReducer = combineReducers({
  car: carSlice.reducer,
  filter: filterSlice.reducer,
  user: userSlice.reducer,
  modal: modalSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
