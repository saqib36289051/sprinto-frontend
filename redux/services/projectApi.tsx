import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/redux";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type RootState = any;
function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const projectApi = createApi({
  reducerPath: "projectApi",
  tagTypes: ["Sprinto"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const { getData } = useLocalStorage();
      const userObject = getData("user")?.token;
      if (userObject) {
        headers.set("Authorization", `Bearer ${userObject}`);
      }

      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (credentials) => ({
        url: "/project",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Sprinto"],
    }),
    projectList: builder.query({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
      providesTags: ["Sprinto"],
    }),
    getProjectById: builder.query({
      query: (id) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Sprinto"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useProjectListQuery,
  useGetProjectByIdQuery,
  util: { getRunningQueriesThunk},
} = projectApi;
