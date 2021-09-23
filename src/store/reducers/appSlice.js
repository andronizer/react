import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("access_token"),
  dashboards: [
    {
      id: 0,
      title: "",
      joined: true,
      columns: [{ title: "", tasks: [] }],
    },
  ],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLogOut: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
    },
    setDashboards: (state, action) => {
      state.dashboards = action.payload;
    },
    appendDashboards: (state, action) => {
      state.dashboards = [...state.dashboards, action.payload];
    },
    toggleJoinDashboard: (state, action) => {
      const index = state.dashboards.findIndex(
        (dashboard) => dashboard.id === action.payload.id
      );
      if (index !== -1) {
        state.dashboards[index].joined = action.payload.state;
      }
    },
    updateDashboard: (state, action) => {
      state.dashboards = state.dashboards.map((e) => {
        if (e.id === action?.payload?.id) {
          return { ...e, ...action.payload };
        }
        return e;
      });
    },
  },
});

export const {
  setIsAuthenticated,
  setLogOut,
  setDashboards,
  appendDashboards,
  toggleJoinDashboard,
  updateDashboard,
} = appSlice.actions;

export const selectIsAuthenticated = (state) => {
  return state.app.isAuthenticated;
};

export const giveDashboards = (state) => {
  return state.app.dashboards;
};

export default appSlice.reducer;
