import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favorite-slice";

const store = configureStore({
  reducer: favoriteSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
