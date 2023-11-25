import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

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
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    //Get movies by types
    getMovies: builder.query({
    query: ({genreIdOrCategoryName, page, searchQuery}) => {
    let queryDetails;

    //Get by search
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
      queryDetails = {
        url: `/search/movie`,
        params: {
          query: searchQuery,
          language: 'vi-VN',
          page: page,
        },
      }
    }

    //popular, top_rated_upcoming -> string
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
      queryDetails = {
        url: `/movie/${genreIdOrCategoryName}`,
        params: {
          language: 'vi-VN',
          page: page,
        },
      }
    }
    // movie genres -> number
    else if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
      queryDetails = {
        url: `/discover/movie/`,
        params: {
          with_genres: genreIdOrCategoryName,
          language: 'vi-VN',
          page: page,
        },
      }
    }
    // default
    else {
      queryDetails = {
        url: `/movie/popular`,
        params: {
          language: 'vi-VN',
          page: page,
        },
      }
    }

    return {
      ...queryDetails,
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
