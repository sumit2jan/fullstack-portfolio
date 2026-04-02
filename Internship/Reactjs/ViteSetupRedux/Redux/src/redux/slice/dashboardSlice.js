import { createSlice } from "@reduxjs/toolkit";

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
    // 🔄 Fetch Start
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // ✅ Fetch Success
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload.data;
      state.totalRows = action.payload.total;
    },

    // ❌ Fetch Error
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔍 Filters & Controls
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

    // ✏️ Edit Modal
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setEditOpen: (state, action) => {
      state.isEditOpen = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
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