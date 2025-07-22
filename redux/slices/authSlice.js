// slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Define a reusable initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: () => initialState, 
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
