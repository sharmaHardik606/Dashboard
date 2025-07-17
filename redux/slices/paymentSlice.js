// redux/slices/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  selectedInvoice: null,
  overview: {
    totalRevenue: 0,
    totalPaid: 0,
    totalPending: 0,
    upcomingDues: 0,
    newSubscriptions: 0,
    overduePayments: 0,
  },
  filter: "all", // or "paid" / "pending"
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    selectInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
    updateOverview: (state, action) => {
      state.overview = action.payload;
    },
    setPaymentFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setInvoices, selectInvoice, updateOverview, setPaymentFilter } = paymentSlice.actions;
export default paymentSlice.reducer;
