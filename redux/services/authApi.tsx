import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/redux';
import useLocalStorage from '@/hooks/useLocalStorage';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Sprinto'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: async (headers, { getState }) => {
            const { getData } = useLocalStorage();
            const userObject = getData('user')?.token 
            if (userObject) {
                headers.set('Authorization', `Bearer ${userObject}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/register/',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: (credentials) => ({
                url: '/logout/',
                method: 'POST',
                body: credentials,
            }),
        }),

    }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;