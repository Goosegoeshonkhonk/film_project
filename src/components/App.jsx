import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

import useStyles from './styles';
import useAI from './AI';

import { Actors, MovieInfor, Movies, NavBar, Profile } from '.';

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();

  useAI();

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
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
