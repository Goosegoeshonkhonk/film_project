import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get genres
    getGenres: builder.query({
      query: () => ({
        url: '/genre/movie/list',
        params: {
          language: 'en',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    // Get movie infor
    getMovie: builder.query({
      query: (id) => ({
        url: `/movie/${id}`,
        params: {
          append_to_response: 'videos, credits',
          language: 'vi-VN',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    // Get movies by types
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        let queryDetails;

        // Get by search
        if (searchQuery) {
          queryDetails = {
            url: '/search/movie',
            params: {
              query: searchQuery,
              language: 'vi-VN',
              page,
            },
          };
        }

        // popular, top_rated_upcoming -> string
        else if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          queryDetails = {
            url: `/movie/${genreIdOrCategoryName}`,
            params: {
              language: 'vi-VN',
              page,
            },
          };
        }
        // movie genres -> number
        else if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          queryDetails = {
            url: '/discover/movie/',
            params: {
              with_genres: genreIdOrCategoryName,
              language: 'vi-VN',
              page,
            },
          };
        }
        // default
        else {
          queryDetails = {
            url: '/movie/popular',
            params: {
              language: 'vi-VN',
              page,
            },
          };
        }

        return {
          ...queryDetails,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbApiKey}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
} = movieApi;
