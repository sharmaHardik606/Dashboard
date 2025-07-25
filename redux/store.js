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
import profileReducer from "./slices/profileSlice";
import paymentModalReducer from "./slices/paymentModalSlice";




// slices to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "members", "plans", "payments", "signup", "profile"],
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  forgotpass: forgotpassReducer,
  signup: signupSliceReducer,
  modal: modalReducer,
  members: memberReducer,
  plans: planReducer,
  payments: paymentReducer,
  notifications: notificationReducer,
  paymentModal: paymentModalReducer, 
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
