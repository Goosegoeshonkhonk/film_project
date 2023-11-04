import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

export default configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});
