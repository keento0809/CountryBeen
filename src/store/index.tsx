import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./favorite-slice";
import { beenReducer } from "./been-slice";
import { AlertReducer } from "./alert-slice";
import { countriesReducer } from "./countries-slice";
import { AuthReducer } from "./auth-slice";

export const store = configureStore({
  reducer: {
    favoriteReducer,
    beenReducer,
    AlertReducer,
    countriesReducer,
    AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
