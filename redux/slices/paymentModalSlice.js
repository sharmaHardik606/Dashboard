import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPaymentModal: false,
  paymentCompleted: false,
  paymentMethod: null, // "card" or "upi"
  showUpiPopup: false,
  modalTimeoutId: null,
};

const paymentModalSlice = createSlice({
  name: "paymentModal",
  initialState,
  reducers: {
    showPayment(state) {
      state.showPaymentModal = true;
      state.paymentCompleted = false;
    },
    completePayment(state) {
      state.paymentCompleted = true;
    },
    hidePayment(state) {
      state.showPaymentModal = false;
      state.paymentCompleted = false;
    },
    setModalTimeout(state, action) {
      state.modalTimeoutId = action.payload;
    },
    clearModal(state) {
      state.showPaymentModal = false;
      state.paymentCompleted = false;
      if (state.modalTimeoutId) {
        clearTimeout(state.modalTimeoutId);
        state.modalTimeoutId = null;
      }
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    showUpiPopup(state) {
      state.showUpiPopup = true;
    },
    hideUpiPopup(state) {
      state.showUpiPopup = false;
    },
  },
});

export const {
  showPayment,
  completePayment,
  hidePayment,
  setModalTimeout,
  clearModal,
  setPaymentMethod,
  showUpiPopup,
  hideUpiPopup,
} = paymentModalSlice.actions;

export default paymentModalSlice.reducer;
