import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/users/',
    prepareHeaders: (headers,) => {
      headers.set('x-access-token', localStorage.getItem('token'));
      return headers
    },
  }),
  endpoints: (builder) => ({

    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: 'profile',
        method: 'GET'
      })
    }),
    search: builder.mutation({
      query: (credentials) => ({
        url: 'search-for-user',
        method: 'POST',
        body: { ...credentials },

      })
    }),
    getUser: builder.query({
      query: ({ username, searchedUser }) => ({
        url: `getUser/?username=${username}&searchedUser=${searchedUser}`,
        method: 'GET'
      })
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLogoutMutation,
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
  useSearchMutation,
  useGetUserQuery,
} = authApi;