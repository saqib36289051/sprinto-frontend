import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/redux";
import useLocalStorage from "@/hooks/useLocalStorage";

export const taskApi = createApi({
  reducerPath: "taskApi",
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
    createTask: builder.mutation({
      query: (credentials) => ({
        url: `/task/${credentials.sprintId}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Sprinto"],
    }),
    taskList: builder.query({
      query: (id) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: ["Sprinto"],
    }),
    getTaskById: builder.query({
      query: (id) => ({
        url: `/task/${id}/GetById`,
        method: "GET",
      }),
      providesTags: ["Sprinto"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useTaskListQuery,
  useGetTaskByIdQuery
} = taskApi;
