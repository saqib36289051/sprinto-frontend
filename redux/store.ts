import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "@/redux/feature/settingSlice";
import { authApi } from "@/redux/services/authApi";
import { projectApi } from "@/redux/services/projectApi";
import { sprintApi } from "./services/sprintApi";
import { taskApi } from "./services/taskApi";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [sprintApi.reducerPath]: sprintApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      projectApi.middleware,
      sprintApi.middleware,
      taskApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
