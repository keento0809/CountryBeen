import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialS, CountryViewObj } from "../models/model";

const initialState: InitialS = {
  favoriteList: [],
  totalNumber: 0,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialState,
  reducers: {
    addFavorite(state, { payload }: PayloadAction<CountryViewObj>) {
      // if (
      //   state.favoriteList.find((country) => country.cca3 === payload.cca3) !==
      //   undefined
      // ) {
      //   alert("This country already exists in BucketList.");
      //   return;
      // }
      // else {
      state.favoriteList = [...state.favoriteList, payload];
      state.totalNumber += 1;
      // }
    },
    removeFavorite(state, { payload }: PayloadAction<CountryViewObj>) {
      const removingCCA3 = payload.cca3;
      state.favoriteList = state.favoriteList.filter(
        (country) => country.cca3 !== removingCCA3
      );
      state.totalNumber -= 1;
    },
  },
});

export const favoriteActions = favoriteSlice.actions;

export const favoriteReducer = favoriteSlice.reducer;
