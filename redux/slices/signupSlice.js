import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: "signup", // or 'otp'
  email: "",      // email to use for OTP verification
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setSignupStep(state, action) {
      state.step = action.payload;
    },
    setSignupEmail(state, action) {
      state.email = action.payload;
    },
    resetSignup(state) {
      state.step = "signup";
      state.email = "";
    },
  },
});

export const { setSignupStep, setSignupEmail, resetSignup } = signupSlice.actions;

export default signupSlice.reducer;
