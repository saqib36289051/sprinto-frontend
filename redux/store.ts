import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "@/redux/feature/settingSlice";
import { authApi } from "@/redux/services/authApi";
import { projectApi } from "@/redux/services/projectApi";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, projectApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
