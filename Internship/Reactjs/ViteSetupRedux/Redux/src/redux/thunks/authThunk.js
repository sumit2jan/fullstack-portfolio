import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await api.post("/students/login", values);

      const { student, token } = res.data.data;

      // store in localStorage
      localStorage.setItem("user", JSON.stringify(student));
      localStorage.setItem("token", token);

      return { user: student, token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);