import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

//  FETCH STUDENTS THUNK
export const fetchStudentsThunk = createAsyncThunk(
    "dashboard/fetchStudents",
    async (params, { rejectWithValue }) => {
        try {
            const res = await api.get("/students/admin/dashboardRedux", {
                params: {
                    page: params.page,
                    limit: params.limit,
                    sortBy: params.sortBy,
                    order: params.order,
                    search: params.search || undefined,
                    gender: params.gender || undefined,
                    country: params.country || undefined,
                },
            });

            return {
                students: res.data.data,
                totalRows: res.data.totalStudents,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch students"
            );
        }
    }
);