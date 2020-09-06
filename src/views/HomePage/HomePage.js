import React, { Component } from "react";
import { Link } from "react-router-dom";
import API_themoviedb from "../../services/API_themovidb";

export default class MoviesPage extends Component {
  state = {
    error: null,
    loading: false,
    popularFilms: [],
  };

  componentDidMount() {
    API_themoviedb.fetchPopularFilms().then((res) =>
      this.setState({ popularFilms: res.results })
    );
  }

  render() {
    const { popularFilms } = this.state;

    return (
      <>
        <h1>Trending today</h1>
        {popularFilms.length > 0 && (
          <ul className="popularFilmList">
            {popularFilms.map((film) => (
              <li key={film.id}>
                <Link to={`/movies/${film.id}`}>{film.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
