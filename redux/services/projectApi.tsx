import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/redux";
import useLocalStorage from "@/hooks/useLocalStorage";

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
  }),
});

export const { useCreateProjectMutation, useProjectListQuery } = projectApi;
