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
          language: 'vi',
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
          append_to_response: 'videos ',
          language: 'vi-VN',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    // Get movie recommendations
    getRecommendations: builder.query({
      query: ({ id, list }) => ({
        url: `/movie/${id}/${list}`,
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

    // Get actor details
    getActorsDetails: builder.query({
      query: (id) => ({
        url: `/person/${id}`,
        params: {
          language: 'en-US',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    // Get actors
    getCredit: builder.query({
      query: (id) => ({
        url: `/movie/${id}/credits`,
        params: {
          language: 'vi-VN',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    // Get Movies by Actors
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => ({
        url: '/discover/movie',
        params: {
          with_cast: id,
          page,
          language: 'vi-VN',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`,
        },
      }),
    }),

    // Get User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => ({
        url: `/account/${accountId}/${listName}`,
        params: {
          session_id: sessionId,
          page,
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
  useGetCreditQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = movieApi;
