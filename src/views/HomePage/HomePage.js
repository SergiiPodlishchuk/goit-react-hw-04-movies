import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      .then(({ results }) => this.setState({ popularFilms: results }))
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { popularFilms, error } = this.state;
    const { location } = this.props;
    return (
      <>
        {error && <Error message={`Whoops ${error.message}`} />}

        <h1>Trending today</h1>

        {popularFilms.length > 0 && (
          <ul className="popularFilmList">
            {popularFilms.map(({ id, title }) => (
              <li key={id}>
                <Link
                  to={{
                    pathname: `/movies/${id}`,
                    state: { from: location },
                  }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
