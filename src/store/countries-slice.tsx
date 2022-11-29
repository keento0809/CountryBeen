import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import countryService from "../features/countryService";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    return await countryService.get();
  }
);
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
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.countries = payload;
    });
  },
});

export const countriesActions = CountriesSlice.actions;

export const countriesReducer = CountriesSlice.reducer;
