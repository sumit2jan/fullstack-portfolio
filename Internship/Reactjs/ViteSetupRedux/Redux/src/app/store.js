import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import dashBoardReducer from "../redux/slice/dashboardSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard:dashBoardReducer,
  },
});