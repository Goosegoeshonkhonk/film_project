import React from 'react';
import { Typography, Grid, Box, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetCreditQuery } from '../../services/TMDB';
import useStyles from './styles';

const TopCast = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetCreditQuery(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Loi roi b ei - Khong hien thi duoc gi dau</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid container spacing={2}>
        {data.cast.slice(0, 6).map((character, i) => (
          character.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character.character.split('/')[0]}</Typography>
            </Grid>
          )
        )).slice(0, 6)}
      </Grid>
    </Grid>
  );
};

export default TopCast;
