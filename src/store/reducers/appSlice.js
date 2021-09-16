import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("access_token"),
  dashboards: [],
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
    setDashboards: (state, action) => {
      state.dashboards = action.payload;
    },
  },
});

export const { setIsAuthenticated, logOut, setDashboards } = appSlice.actions;

export const selectIsAuthenticated = (state) => {
  return state.app.isAuthenticated;
};

export const giveDashboards = (state) => {
  return state.app.dashboards;
};

export default appSlice.reducer;
