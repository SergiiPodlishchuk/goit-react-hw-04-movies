import React, { Component } from "react";
import { Link } from "react-router-dom";
import API_themoviedb from "../../services/API_themovidb";

export default class MoviesPage extends Component {
  state = {
    searchQuery: "",
    filmsSearch: [],
  };

  fetch() {
    API_themoviedb.fetchFilmWithQuery(this.state.searchQuery).then((res) =>
      this.setState({ filmsSearch: res.results })
    );
  }

  handleChange = ({ target }) => {
    this.setState({ searchQuery: target.value });
  };

  handleSubmit = (e) => {
    const { searchQuery } = this.state;
    e.preventDefault();
    this.fetch(searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    const { searchQuery, filmsSearch } = this.state;
    const { match } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter film"
            value={searchQuery}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>

        {filmsSearch && (
          <ul className="popularFilmList">
            {filmsSearch.map((film) => (
              <li key={film.id}>
                <Link to={`${match.url}/${film.id}`}>
                  {film.original_title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
