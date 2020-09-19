import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import API_themoviedb from "../../../services/API_themovidb";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import routes from "../../../routes";

export default class MoviesDetailsPage extends Component {
  state = {
    aboutFilm: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    API_themoviedb.fetchFilmDetails(movieId).then((aboutFilm) =>
      this.setState({ aboutFilm })
    );
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }
    this.props.history.push(routes.moviesPage);
  };

  render() {
    const { aboutFilm } = this.state;
    const { match, location } = this.props;
    const { cast, reviews } = routes;
    return (
      <>
        <button onClick={this.handleGoBack}> &#8656; Go back</button>
        {aboutFilm && (
          <div className="MovieDetails">
            <div className="MovieDetailsImage">
              <img
                src={`http://image.tmdb.org/t/p/w500${aboutFilm.poster_path}`}
                alt={aboutFilm.title}
              />
            </div>
            <div className="MovieDetailsAbout">
              <h1>
                {aboutFilm.original_title}(
                {new Date(aboutFilm.release_date).getFullYear()})
              </h1>
              <p>User Scores: {aboutFilm.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{aboutFilm.overview}</p>
              <h2>Genres</h2>
              <ul>
                {aboutFilm.genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div>
          <h2>Additional information</h2>
          <ul className="addInformation">
            <li>
              <Link
                to={{
                  pathname: `/movies/${match.params.movieId}/cast`,
                  state: { from: location },
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `/movies/${match.params.movieId}/reviews`,
                  state: { from: location },
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <Route path={cast} component={Cast} />
          <Route path={reviews} component={Reviews} />
        </div>
      </>
    );
  }
}
