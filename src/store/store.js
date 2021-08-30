import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
