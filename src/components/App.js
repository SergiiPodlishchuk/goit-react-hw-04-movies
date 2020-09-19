import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Loader from "react-loader-spinner";
import "../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Navigation from "./Navigation";
import routes from "../routes";

const AsyncHomePage = lazy(() =>
  import("./views/HomePage/HomePage" /* webpackChunkName: "home-page" */)
);

const AsyncMoviesPage = lazy(() =>
  import("./views/MoviesPage/MoviesPage" /* webpackChunkName: "Movies-page" */)
);

const AsyncMovieDetails = lazy(() =>
  import(
    "./views/MoviesDetailsPage/MoviesDetailsPage" /* webpackChunkName: "MoviesDetailsPage-page" */
  )
);

const { homePage, moviesPage, moviesDetailsPage } = routes;

const App = () => {
  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="#f5f505"
            height={50}
            width={100}
            timeout={3000} //3 secs
          />
        }
      >
        <Switch>
          <Route path={homePage} exact component={AsyncHomePage} />
          <Route path={moviesPage} exact component={AsyncMoviesPage} />
          <Route path={moviesDetailsPage} component={AsyncMovieDetails} />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
