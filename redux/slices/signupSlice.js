import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Initial state
const initialState = {
  step: "signup",
  email: "",
};

// Async thunks
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ email, password }, thunkAPI) => {
    await new Promise((res) => setTimeout(res, 1000));
    if (!email.includes("@") || password.length < 4) {
      return thunkAPI.rejectWithValue("Invalid email or password");
    }
    thunkAPI.dispatch(setSignupEmail(email));
    thunkAPI.dispatch(setSignupStep("otp"));
    return { message: "OTP sent" };
  }
);

export const verifySignupOtp = createAsyncThunk(
  "signup/verifySignupOtp",
  async ({ email, otp }, thunkAPI) => {
    await new Promise((res) => setTimeout(res, 1000));
    if (otp !== "123456") {
      return thunkAPI.rejectWithValue("Invalid OTP");
    }
    return {
      user: { name: "User", email },
      token: "mock-token-123",
    };
  }
);

export const resendSignupOtp = createAsyncThunk(
  "signup/resendSignupOtp",
  async (_, thunkAPI) => {
    await new Promise((res) => setTimeout(res, 500));
    return { message: "OTP resent" };
  }
);

// Slice
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
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.rejected, (state, action) => {
        console.error("Signup failed:", action.payload);
      })
      .addCase(verifySignupOtp.rejected, (state, action) => {
        console.error("OTP failed:", action.payload);
      });
  },
});

// Exports
export const { setSignupStep, setSignupEmail, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
