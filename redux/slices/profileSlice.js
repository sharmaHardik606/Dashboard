import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as profileApi from "@/lib/api/profile";

// Thunks for each major async action
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    return await profileApi.getProfile();
  }
);
export const submitProfile = createAsyncThunk(
  "profile/submitProfile",
  async (formData) => {
    return await profileApi.submitProfile(formData);
  }
);
export const markProfileComplete = createAsyncThunk(
  "profile/markProfileComplete",
  async () => {
    return await profileApi.markProfileComplete();
  }
);

const initialState = {
  isProfileComplete: false,
  loading: false,
  error: null,
  data: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isProfileComplete = !!action.payload.isComplete;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitProfile.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(submitProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markProfileComplete.fulfilled, (state, action) => {
        // Accept backend or mock that returns PROFILE
        state.data = action.payload;
        state.isProfileComplete = !!action.payload.isComplete;
      });
  },
});

export default profileSlice.reducer;
