import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const lettersApi = createApi({
  reducerPath: 'lettersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/letters/'
  }),

  endpoints: (builder) => ({

    getLetters: builder.query({
      query: () => ({
        url: 'createLetter',
        method: 'GET',
      }),
    }),

    createLetter: builder.mutation({
      query: (collection) => ({
        url: 'createLetter',
        method: 'POST',
        body: { ...collection },
      }),
    }),
  }),
});

export const {
  useGetLettersMutation,
  useCreateLetterMutation
} = lettersApi;
