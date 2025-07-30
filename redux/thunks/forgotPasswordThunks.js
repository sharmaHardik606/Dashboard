import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendForgotOtp = createAsyncThunk(
  "forgotPassword/sendOtp",
  async (email, thunkAPI) => {
    try {
      const mockResponse = await new Promise((resolve) => {
        setTimeout(() => {
          console.log("✅ Mock OTP sent to", email);
          resolve({ success: true, message: "OTP sent to email" });
        }, 1000);
      });

      return mockResponse;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to send OTP");
    }
  }
);



export const verifyForgotOtp = createAsyncThunk(
  "auth/verifyForgotOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const mockResponse = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (otp === "123456") {
            console.log("✅ Mock OTP verified for", email);
            resolve({ success: true, user: { email } });
          } else {
            reject(new Error("Invalid OTP"));
          }
        }, 1000);
      });

      return mockResponse;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "OTP verification failed");
    }
  }
);

// redux/thunks/forgotPasswordThunks.js
export const resetForgotPassword = createAsyncThunk(
  "auth/resetForgotPassword",
  async ({ email, password }, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ Mock password reset for ${email}`);
        resolve({ success: true });
      }, 1000);
    });
  }
);



// export const resetForgotPassword = createAsyncThunk(
//   "auth/resetForgotPassword",
//   async ({ email, password }, thunkAPI) => {
//     const res = await axios.post("/api/auth/forgot-password/reset", { email, password });
//     return res.data;
//   }
// );
