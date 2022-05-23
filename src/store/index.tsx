import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./favorite-slice";
import { beenReducer } from "./been-slice";

export const store = configureStore({
  reducer: { favoriteReducer, beenReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
