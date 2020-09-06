const baseURL = "https://api.themoviedb.org/3";
const KEY = "1d916c0c07d2a239e775f6755e7dcee9";

const fetchPopularFilms = () => {
  return fetch(`${baseURL}/trending/all/day?api_key=${KEY}`).then((res) =>
    res.json()
  );
};

const fetchFilmWithQuery = (searchQuery) => {
  return fetch(
    `${baseURL}/search/movie?api_key=${KEY}&query=${searchQuery}&page=1&include_adult=false`
  ).then((res) => res.json());
};

const fetchFilmDetails = (movieId) => {
  return fetch(`${baseURL}/movie/${movieId}?api_key=${KEY}`).then((res) =>
    res.json()
  );
};

const fetchFilmActors = (movieId) => {
  return fetch(
    `${baseURL}/movie/${movieId}/credits?api_key=${KEY}`
  ).then((res) => res.json());
};

const fetchFilmReviews = (movieId) => {
  return fetch(
    `${baseURL}/movie/${movieId}/reviews?api_key=${KEY}`
  ).then((res) => res.json());
};

export default {
  fetchPopularFilms,
  fetchFilmDetails,
  fetchFilmWithQuery,
  fetchFilmActors,
  fetchFilmReviews,
};
