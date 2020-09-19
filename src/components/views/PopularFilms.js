import React from "react";
import { Link } from "react-router-dom";

const PopularFilms = ({ films, location }) => {
  return (
    <ul className="popularFilmList">
      {films.map(({ id, title }) => (
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
  );
};

export default PopularFilms;
