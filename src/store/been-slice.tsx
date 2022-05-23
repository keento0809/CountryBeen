import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BeenToInitialS, CountryViewObj } from "../models/model";

const initialState: BeenToInitialS = {
  beenToList: [],
  totals: 0,
};

const BeenSlice = createSlice({
  name: "beenTo",
  initialState: initialState,
  reducers: {
    addBeenTo(state, { payload }: PayloadAction<CountryViewObj>) {
      const existing = state.beenToList.find(
        (country) => country.cca3 === payload.cca3
      );
      if (existing) {
        alert("You've already added this country.");
        return;
      } else {
        state.beenToList = [...state.beenToList, payload];
        state.totals += 1;
      }
    },
    removeBeenTo(state, { payload }: PayloadAction<CountryViewObj>) {
      state.beenToList = state.beenToList.filter(
        (country) => country.cca3 !== payload.cca3
      );
      state.totals -= 1;
    },
  },
});

export const beenActions = BeenSlice.actions;

export const beenReducer = BeenSlice.reducer;
