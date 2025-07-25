import { createSlice } from "@reduxjs/toolkit";

// Define a reusable initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isProfileComplete: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfileComplete: (state, action) => {
      state.isProfileComplete = action.payload;
    },

    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: () => initialState,
  },
});

export const { login, logout, setProfileComplete  } = authSlice.actions;
export default authSlice.reducer;
