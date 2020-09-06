import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./Navigation";

import HomePage from "../views/HomePage/HomePage";
import MoviesPage from "../views/MoviesPage/MoviesPage";
import MoviesDetailsPage from "../views/MoviesDetailsPage/MoviesDetailsPage";

import routes from "../routes";

const App = () => {
  return (
    <>
      <Navigation />

      <Switch>
        <Route path={routes.homePage} exact component={HomePage} />
        <Route path={routes.moviesPage} exact component={MoviesPage} />
        <Route path={routes.moviesDetailsPage} component={MoviesDetailsPage} />

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
