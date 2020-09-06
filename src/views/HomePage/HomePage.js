import React, { Component } from "react";
import { Link } from "react-router-dom";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import API_themoviedb from "../../services/API_themovidb";
import Error from "../../components/PageError";

export default class MoviesPage extends Component {
  state = {
    error: null,
    loading: false,
    popularFilms: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    API_themoviedb.fetchPopularFilms()
      .then((res) => this.setState({ popularFilms: res.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { popularFilms, loading, error } = this.state;

    return (
      <>
        {error && <Error message={`Whoops ${error.message}`} />}

        <h1>Trending today</h1>
        {loading && (
          <Loader
            type="ThreeDots"
            color="#f5f505"
            height={50}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        {popularFilms.length > 0 && (
          <ul className="popularFilmList">
            {popularFilms.map((film) => (
              <li key={film.id}>
                <Link
                  to={{
                    pathname: `/movies/${film.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {film.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
