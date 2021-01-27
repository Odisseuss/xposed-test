import { createSlice } from "@reduxjs/toolkit";

interface Auth {
  isLoggedIn: boolean;
}
// Try to get initial state from local storage
const initialRecordsState: Auth = {
  isLoggedIn: Boolean(localStorage.getItem("is_logged_in")) || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialRecordsState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
