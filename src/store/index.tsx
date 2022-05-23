import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./favorite-slice";

export const store = configureStore({
  reducer: favoriteReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
