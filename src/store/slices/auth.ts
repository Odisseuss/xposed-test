import { createSlice } from "@reduxjs/toolkit";

interface Auth {
  isLoggedIn: boolean;
}
const initialRecordsState: Auth = { isLoggedIn: false };

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
