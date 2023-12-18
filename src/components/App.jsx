import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import useStyles from './styles';

import { Actors, MovieInfor, MovieList, Movies, NavBar, Profile } from '.';

// -> root -> all movies -> /id123 -> movie information -> more //
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/movie/:id">
            <MovieInfor />
          </Route>

          <Route exact path="/actors/:id">
            <Actors />
          </Route>

          <Route exact path={['/', '/approved']}>
            <Movies />
          </Route>

          <Route exact path="/movies">
            <h1>Movies</h1>
          </Route>

          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
