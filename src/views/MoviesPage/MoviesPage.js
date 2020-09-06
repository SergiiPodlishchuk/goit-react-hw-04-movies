import React, { Component } from "react";
import { Link } from "react-router-dom";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import API_themoviedb from "../../services/API_themovidb";
import SearchBox from "../../components/SearchBox";
import getQueryParams from "../../utils/getQueryParams";
import Error from "../../components/PageError";

export default class MoviesPage extends Component {
  state = {
    error: null,
    loading: false,
    filmsSearch: [],
    value: "",
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);
    if (query) {
      this.fetchFilms(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.fetchFilms(nextQuery);
    }
  }

  fetchFilms = (query) => {
    this.setState({ loading: true });
    this.setState({ value: query });
    API_themoviedb.fetchFilmWithQuery(query)
      .then((res) => this.setState({ filmsSearch: res.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleChangeQuery = (query) => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { filmsSearch, loading, error, value } = this.state;
    const { match } = this.props;
    console.log(filmsSearch);
    return (
      <>
        <SearchBox onSubmit={this.handleChangeQuery} />
        {loading && (
          <Loader
            type="ThreeDots"
            color="#f5f505"
            height={50}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        {error && <Error message={`Whoops ${error.message}`} />}
        {filmsSearch.length === 0 && value && <p>Not found</p>}
        {filmsSearch && (
          <ul className="popularFilmList">
            {filmsSearch.map((film) => (
              <li key={film.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${film.id}`,
                    state: { from: this.props.location },
                  }}
                >
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
