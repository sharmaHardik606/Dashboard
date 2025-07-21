import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  otpVerified: false,
  step: "email", //  Add this line to track which step the user is on
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setOtpVerified(state, action) {
      state.otpVerified = action.payload;
    },
    setStep(state, action) {
      state.step = action.payload; //  Add reducer to update step
    },
    resetForgotPassword(state) {
      state.email = "";
      state.otpVerified = false;
      state.step = "email"; // Reset step too
    },
  },
});

export const { setEmail, setOtpVerified, setStep, resetForgotPassword } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
