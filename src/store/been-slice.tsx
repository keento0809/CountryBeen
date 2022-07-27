import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BeenToInitialS, CountryViewObj } from "../models/model";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialState: BeenToInitialS = {
  beenToList: [],
  totals: 0,
  isSuccessToAdd: false,
};

const BeenSlice = createSlice({
  name: "beenTo",
  initialState: initialState,
  reducers: {
    fetchBeenTo(state, { payload }: PayloadAction<CountryViewObj[]>) {
      state.beenToList = [...payload];
      state.totals = payload.length;
    },
    addBeenTo(state, { payload }: PayloadAction<CountryViewObj>) {
      if (payload === undefined) {
        alert("Somehow this one is undefined.");
        return;
      }
      if (
        state.beenToList.find((country) => country.cca3 === payload.cca3) !==
        undefined
      ) {
        alert("You've already added this country.");
        state.isSuccessToAdd = false;
        return;
      } else {
        state.isSuccessToAdd = true;
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
