import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/redux";
import useLocalStorage from "@/hooks/useLocalStorage";

export const sprintApi = createApi({
  reducerPath: "sprintApi",
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
    createSprint: builder.mutation({
      query: (credentials) => ({
        url: `/sprint/${credentials.projectId}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Sprinto"],
    }),
    sprintList: builder.query({
      query: (id) => ({
        url: `/sprint/${id}`,
        method: "GET",
      }),
      providesTags: ["Sprinto"],
    }),
    getSprintsById: builder.query({
      query: (id) => ({
        url: `/sprint/${id}/GetById`,
        method: "GET",
      }),
      providesTags: ["Sprinto"],
    }),
  }),
});

export const {
  useCreateSprintMutation,
  useSprintListQuery,
  useGetSprintsByIdQuery,
} = sprintApi;
