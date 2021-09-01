import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("access_token"),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
    },
  },
});

export const { setIsAuthenticated, logOut } = appSlice.actions;

export const selectIsAuthenticated = (state) => {
  return state.app.isAuthenticated;
};

export default appSlice.reducer;
