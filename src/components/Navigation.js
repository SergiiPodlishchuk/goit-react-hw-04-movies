import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";

const { homePage, moviesPage } = routes;

const Navigation = () => (
  <ul className="Navigation">
    <li>
      <NavLink
        exact
        to={homePage}
        className="Navigation-link"
        activeClassName="Navigation-link-active"
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to={moviesPage}
        className="Navigation-link"
        activeClassName="Navigation-link-active"
      >
        Movies
      </NavLink>
    </li>
  </ul>
);
export default Navigation;
