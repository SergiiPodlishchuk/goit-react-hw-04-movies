import React, { Component } from "react";
import API_themoviedb from "../../../services/API_themovidb";

export default class fetchActorsList extends Component {
  state = { review: [] };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    API_themoviedb.fetchFilmReviews(movieId).then(({ results }) =>
      this.setState({ review: results })
    );
  }

  render() {
    const { review } = this.state;
    return (
      <>
        {review.length === 0 && <p>We don't have any reviews for this movie</p>}
        {review.length > 0 && (
          <ul>
            {review.map(({ id, author, content }) => (
              <li key={id}>
                <h2>{author}</h2>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
