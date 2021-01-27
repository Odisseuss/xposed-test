import { createSlice } from "@reduxjs/toolkit";

interface Auth {
  isLoggedIn: boolean;
}
// Set initial state
const initialAuthState: Auth = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
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
export const selectAuth = (state: { isLoggedIn: Auth }): Auth =>
  state.isLoggedIn;

export default authSlice.reducer;
