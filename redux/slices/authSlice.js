import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "@/lib/api/auth";

// === THUNKS ===
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginUser(email, password);
      return res; // { user, token }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signupUser(formData);
      return res; // { user, token }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// === INITIAL STATE ===
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isProfileComplete: false,
  loading: false,
  error: null,
};

// === SLICE ===
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
    setProfileComplete: (state, action) => {
      state.isProfileComplete = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // signup
    builder
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setProfileComplete, login } = authSlice.actions;
export default authSlice.reducer;
