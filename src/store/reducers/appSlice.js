import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("userDetails");
      state.isAuthenticated = false;
    },
  },
});

export const { setIsAuthenticated, logOut } = appSlice.actions;

export const selectIsAuthenticated = (state) => {
  return state.app.isAuthenticated;
};

export default appSlice.reducer;
