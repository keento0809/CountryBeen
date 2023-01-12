import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertInitialState } from "../types/index";

const initialState: AlertInitialState = {
  isAlerting: false,
  alertText: "",
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    turnOnAlert(state, { payload }: PayloadAction<string>) {
      state.isAlerting = true;
      state.alertText = payload;
    },
    turnOffAlert(state) {
      state.isAlerting = false;
      state.alertText = "";
    },
  },
});

export const AlertActions = AlertSlice.actions;

export const AlertReducer = AlertSlice.reducer;
