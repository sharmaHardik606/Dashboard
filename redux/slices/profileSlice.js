import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileComplete: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    completeProfile: (state) => {
      state.isProfileComplete = true;
    },
  },
});

export const { completeProfile } = profileSlice.actions;
export default profileSlice.reducer;
