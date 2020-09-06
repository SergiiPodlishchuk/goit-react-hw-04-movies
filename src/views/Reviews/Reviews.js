import React, { Component } from "react";
import API_themoviedb from "../../services/API_themovidb";

export default class fetchActorsList extends Component {
  state = { review: [] };

  componentDidMount() {
    API_themoviedb.fetchFilmReviews(
      this.props.match.params.movieId
    ).then((res) => this.setState({ review: res.results }));
  }

  render() {
    const { review } = this.state;
    return (
      <>
        {review.length === 0 && <p>We don't have any reviews for this movie</p>}
        {review.length > 0 && (
          <ul>
            {review.map((review) => (
              <li key={review.id}>
                <h2>{review.author}</h2>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
