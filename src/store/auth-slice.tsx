import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state) {
      state.isLoggedIn = true;
    },
    signOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
