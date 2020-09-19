import React, { Component } from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import API_themoviedb from "../../../services/API_themovidb";
import SearchBox from "../../SearchBox";
import getQueryParams from "../../../utils/getQueryParams";
import Error from "../../PageError";
import PopularFilms from "../PopularFilms";

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
    this.setState({ loading: true, value: query });

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
    const { match, location } = this.props;

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
          <PopularFilms films={filmsSearch} location={location} />
        )}
      </>
    );
  }
}
