import React, { Component } from "react";
import API_themoviedb from "../../../services/API_themovidb";

export default class fetchActorsList extends Component {
  state = { filmActors: [] };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    API_themoviedb.fetchFilmActors(movieId).then(({ cast }) =>
      this.setState({ filmActors: cast })
    );
  }

  render() {
    const { filmActors } = this.state;

    return (
      <ul>
        {filmActors.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            <img
              className="photoActor"
              src={`http://image.tmdb.org/t/p/w500${profile_path}`}
              alt=""
            />
            <p>{name}</p>
            <p>{character}</p>
          </li>
        ))}
      </ul>
    );
  }
}
