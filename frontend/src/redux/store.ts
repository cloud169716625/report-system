import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { reportApi } from "./api/reportApi";
import { payInfoApi } from "./api/payInfoApi";
import { freelancerInfoApi } from "./api/freelancerInfoApi";
import { upworkInfoApi } from "./api/upworkInfoApi";
import { pcInfoApi } from "./api/pcInfoApi";
import { vpsInfoApi } from "./api/vpsInfoApi";
import { paymentApi } from "./api/paymentApi";
import userReducer from "./features/userSlice";
import sidebarActionReducer from "./features/sidebarActionSlice";
import reportReducer from "./features/reportSlice";
import payHistoryReducer from "./features/paymentSlice";
import AllPayHistoryReducer from "./features/allPaymentSlice";
import submitDateReducer from "./features/submitDateSlice";

export const store: any = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [payInfoApi.reducerPath]: payInfoApi.reducer,
    [pcInfoApi.reducerPath]: pcInfoApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    userState: userReducer,
    sidebarState: sidebarActionReducer,
    reportState: reportReducer,
    payHistoryState: payHistoryReducer,
    allPayHistoryState: AllPayHistoryReducer,
    submitDateState: submitDateReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      reportApi.middleware,
      payInfoApi.middleware,
      pcInfoApi.middleware,
      paymentApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
