import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteList: [],
  },
  reducers: {
    addFavorite() {},
    removeFavorite() {},
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice;
