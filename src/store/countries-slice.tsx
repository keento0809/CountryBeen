import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
};

const CountriesSlice = createSlice({
  name: "countries",
  initialState: initialState,
  reducers: {
    fetchCountries(state, { payload }: PayloadAction<any>) {
      state.countries = payload;
    },
  },
});

export const countriesActions = CountriesSlice.actions;

export const countriesReducer = CountriesSlice.reducer;
