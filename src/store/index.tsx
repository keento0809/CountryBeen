import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./favorite-slice";
import { beenReducer } from "./been-slice";
import { AlertReducer } from "./alert-slice";
import { countriesReducer } from "./countries-slice";

export const store = configureStore({
  reducer: { favoriteReducer, beenReducer, AlertReducer, countriesReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
