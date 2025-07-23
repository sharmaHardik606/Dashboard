import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import memberReducer from "./slices/memberSlice";
import planReducer from "./slices/planSlice";
import paymentReducer from "./slices/paymentSlice";
import notificationReducer from "./slices/notificationSlice";
import forgotpassReducer from "./slices/forgotPasswordSlice";
import signupSliceReducer from "./slices/signupSlice"; 


// slices to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "members", "plans", "payments", "signup"],
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  forgotpass: forgotpassReducer,
  signup: signupSliceReducer,
  modal: modalReducer,
  members: memberReducer,
  plans: planReducer,
  payments: paymentReducer,
  notifications: notificationReducer,
});

// Apply persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware adjustments
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
