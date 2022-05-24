import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./favorite-slice";
import { beenReducer } from "./been-slice";
import { AlertReducer } from "./alert-slice";

export const store = configureStore({
  reducer: { favoriteReducer, beenReducer, AlertReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
