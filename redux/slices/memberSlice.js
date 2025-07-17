
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memberList: [],
  selectedMember: null,
  filters: {
    status: "all",
    search: "",
    plan: "all",
  },
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.memberList = action.payload;
    },
    selectMember: (state, action) => {
      state.selectedMember = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedMember: (state) => {
      state.selectedMember = null;
    },
  },
});

export const { setMembers, selectMember, updateFilters, clearSelectedMember } = memberSlice.actions;
export default memberSlice.reducer;
