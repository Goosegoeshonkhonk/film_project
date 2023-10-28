import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({
        url: `/movie/popular?language=vi-VN&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery } = movieApi;
