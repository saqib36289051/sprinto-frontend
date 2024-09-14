import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "@/redux/feature/settingSlice";
import { authApi } from "@/redux/services/authApi";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
