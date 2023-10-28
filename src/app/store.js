import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../services/TMDB';

export default configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});
