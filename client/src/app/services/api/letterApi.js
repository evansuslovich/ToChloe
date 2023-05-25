import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const lettersApi = createApi({
  reducerPath: 'lettersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/letters/',
    prepareHeaders: (headers,) => {
      headers.set('x-access-token', localStorage.getItem('token'));
      return headers
    },
  }),

  endpoints: (builder) => ({

    getLetters: builder.query({
      query: () => ({
        url: 'getLetters',
        method: 'GET',
      }),
    }),

    createLetter: builder.mutation({
      query: (letter) => ({
        url: 'createLetter',
        method: 'POST',
        body: { ...letter },
      }),
    }),
  }),
});

export const {
  useGetLettersQuery,
  useCreateLetterMutation
} = lettersApi;