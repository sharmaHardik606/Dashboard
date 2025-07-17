
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workoutPlans: [],
  dietPlans: [],
  selectedPlan: null,
};

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setWorkoutPlans: (state, action) => {
      state.workoutPlans = action.payload;
    },
    setDietPlans: (state, action) => {
      state.dietPlans = action.payload;
    },
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
    },
  },
});

export const { setWorkoutPlans, setDietPlans, selectPlan, clearSelectedPlan } = planSlice.actions;
export default planSlice.reducer;
