import React, { Component } from "react";
import API_themoviedb from "../../services/API_themovidb";

export default class fetchActorsList extends Component {
  state = { filmActors: [] };

  componentDidMount() {
    API_themoviedb.fetchFilmActors(
      this.props.match.params.movieId
    ).then((res) => this.setState({ filmActors: res.cast }));
  }

  render() {
    const { filmActors } = this.state;

    return (
      <>
        <ul>
          {filmActors.map((actor) => (
            <li key={actor.id}>
              <img
                className="photoActor"
                src={`http://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt=""
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
