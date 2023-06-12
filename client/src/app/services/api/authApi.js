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
    getSentRequests: builder.query({
      query: (userId) => ({
        url: `sentRequests/?userId=${userId}`,
        method: 'GET'
      })
    }),
    getReceivedRequests: builder.query({
      query: (userId) => ({
        url: `receivedRequests/?userId=${userId}`,
        method: 'GET'
      })
    }),
    sendFriendRequest: builder.mutation({
      query: (credentials) => ({
        url: 'send-friend-request',
        method: 'POST',
        body: { ...credentials },
      })
    }),
    acceptFriendRequest: builder.mutation({
      query: (credentials) => ({
        url: 'accept-friend-request',
        method: 'POST',
        body: { ...credentials },
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
  useGetSentRequestsQuery, 
  useGetReceivedRequestsQuery, 
  useSendFriendRequestMutation, 
  useAcceptFriendRequestMutation,
} = authApi;