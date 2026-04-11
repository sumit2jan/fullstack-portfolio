import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentsThunk } from "./dashBoardThunk";

const initialState = {
  students: [],
  loading: false,
  error: null,

  // Pagination
  page: 1,
  limit: 5,
  totalRows: 0,

  // Filters
  search: "",
  debouncedSearch: "",
  sortBy: "createdAt",
  order: "desc",
  gender: "",
  country: "",

  // UI State
  selectedUser: null,
  isEditOpen: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    // Filters & Controls
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setDebouncedSearch: (state, action) => {
      state.debouncedSearch = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setLimit: (state, action) => {
      state.limit = action.payload;
    },

    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },

    setGender: (state, action) => {
      state.gender = action.payload;
    },

    setCountry: (state, action) => {
      state.country = action.payload;
    },

    // Edit Modal
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setEditOpen: (state, action) => {
      state.isEditOpen = action.payload;
    },
  },

  // THUNK HANDLING HERE
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.totalRows = action.payload.totalRows;
      })
      .addCase(fetchStudentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearch,
  setDebouncedSearch,
  setPage,
  setLimit,
  setSort,
  setGender,
  setCountry,
  setSelectedUser,
  setEditOpen,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;