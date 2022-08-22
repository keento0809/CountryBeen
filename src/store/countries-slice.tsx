import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const fetchCountries = createAsyncThunk(
  "countries/getCountries",
  async (thunkAPI) => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
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
