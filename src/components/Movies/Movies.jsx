import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Movies = () => {
  const [page, setpage] = useState(1);
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName});

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress sixe="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          Không tìm thấy kết quả. Hãy thử tìm với từ khóa khác nha!
        </Typography>
      </Box>
    );
  }

  if (error) return 'Có lỗi xảy ra';

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
