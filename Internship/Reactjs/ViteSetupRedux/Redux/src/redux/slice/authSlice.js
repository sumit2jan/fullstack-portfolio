import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/authThunk";

const userFromStorage = JSON.parse(localStorage.getItem("user"));
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  // THUNK HANDLING
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // success
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // yha pe bhi hum token localstorage pe store kra sakte hai but hamne abhi yeh chiz thunk mai hi ki hai use.
      })

      // error
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;