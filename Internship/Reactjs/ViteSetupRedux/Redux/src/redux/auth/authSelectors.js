import { createSelector } from "@reduxjs/toolkit";

//  Base selector (single source of truth)
export const selectAuth = (state) => state.auth;

//  User
export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

//  Token
export const selectToken = createSelector(
  [selectAuth],
  (auth) => auth.token
);

//  Loading
export const selectAuthLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
);

//  Error
export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth.error
);

//  Derived Selector (important)
export const selectIsAdmin = createSelector(
  [selectCurrentUser],
  (user) => user?.role === "admin"
);