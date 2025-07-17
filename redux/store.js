
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import memberReducer from "./slices/memberSlice";
import planReducer from "./slices/planSlice";
import paymentReducer from "./slices/paymentSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    members: memberReducer,
    plans: planReducer,
    payments: paymentReducer,
    notifications: notificationReducer,
  },
});
