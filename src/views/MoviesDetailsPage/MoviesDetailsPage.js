import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import API_themoviedb from "../../services/API_themovidb";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import routes from "../../routes";

export default class MoviesDetailsPage extends Component {
  state = {
    aboutFilm: null,
  };

  componentDidMount() {
    API_themoviedb.fetchFilmDetails(
      this.props.match.params.movieId
    ).then((aboutFilm) => this.setState({ aboutFilm }));
  }

  handleGoBack = () => {
    console.log("back");
    const { state } = this.props.location;

    if (state && state.from) {
      console.log(state.from);
      return this.props.history.push(state.from);
    }
    this.props.history.push(routes.moviesPage);
  };

  render() {
    const { aboutFilm } = this.state;
    console.log(aboutFilm);
    const { match } = this.props;

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
                {aboutFilm.genres.map((genres) => (
                  <li key={genres.id}>{genres.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div>
          <h2>Additional information</h2>
          <ul className="addInformation">
            <li>
              <Link to={`/movies/${match.params.movieId}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`/movies/${match.params.movieId}/reviews`}>
                Reviews
              </Link>
            </li>
          </ul>
          <Route path={routes.cast} component={Cast} />
          <Route path={routes.reviews} component={Reviews} />
        </div>
      </>
    );
  }
}
