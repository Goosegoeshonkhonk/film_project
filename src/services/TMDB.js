import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //Get genres
    getGenres: builder.query({
      query: () => ({
        url: `/genre/movie/list`,
        params: {
          language: 'en',
          page: page,
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    //Get movies by types
    getMovies: builder.query({
      query: (genreIdOrCategoryName, page) => {
        //popular, top_rated_upcoming -> string
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return {
            url: `/movie/${genreIdOrCategoryName}`,
            params: {
              language: 'en-US',
              page: page,
            },
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${tmdbApiKey}`,
            },
          }
        }

        // movie genres -> number
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return {
            url: `/discover/movie/`,
            params: {
              with_genres: genreIdOrCategoryName,
              language: 'en-US',
              page: page,
            },
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${tmdbApiKey}`,
            },
          }
        }
        
        //popular movies -> starting first
        return {
          url: `/movie/popular`,
          params: {
            language: 'vi-VN',
            page: page,
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbApiKey}`,
          },
        }
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
} = movieApi;
