import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/lib/api/subscriptionPlans";

export const fetchSubscriptionPlans = createAsyncThunk(
  "subscriptionPlans/fetchAll",
  api.getSubscriptionPlans
);
export const fetchCurrentSubscriptionPlan = createAsyncThunk(
  "subscriptionPlans/fetchCurrent",
  api.getCurrentSubscriptionPlan
);
export const upgradeSubscriptionPlanThunk = createAsyncThunk(
  "subscriptionPlans/upgrade",
  async (planId, thunkAPI) => {
    console.log("[THUNK] upgradeSubscriptionPlanThunk called with:", planId);
    return await api.upgradeSubscriptionPlan(planId);
  }
);

export const cancelSubscriptionPlanThunk = createAsyncThunk(
  "subscriptionPlans/cancel",
  api.cancelSubscriptionPlan
);

const initialState = {
  subscriptionPlans: [],
  currentSubscriptionPlan: null,
  loading: false,
  error: null,
  upgrading: false,
  cancelling: false,
};

const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch plans
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionPlans = action.payload;
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      // Fetch current plan
      .addCase(fetchCurrentSubscriptionPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscriptionPlan = action.payload;
      })
      .addCase(fetchCurrentSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      // Upgrade plan
      .addCase(upgradeSubscriptionPlanThunk.pending, (state) => {
        state.upgrading = true;
      })
      .addCase(upgradeSubscriptionPlanThunk.fulfilled, (state, action) => {
        state.upgrading = false;
        state.currentSubscriptionPlan = action.payload;
      })
      .addCase(upgradeSubscriptionPlanThunk.rejected, (state, action) => {
        state.upgrading = false;
        state.error = action.error?.message;
      })
      // Cancel plan
      .addCase(cancelSubscriptionPlanThunk.pending, (state) => {
        state.cancelling = true;
      })
      .addCase(cancelSubscriptionPlanThunk.fulfilled, (state) => {
        state.cancelling = false;
        state.currentSubscriptionPlan = null;
      })
      .addCase(cancelSubscriptionPlanThunk.rejected, (state, action) => {
        state.cancelling = false;
        state.error = action.error?.message;
      });
  },
});

export default subscriptionPlanSlice.reducer;
