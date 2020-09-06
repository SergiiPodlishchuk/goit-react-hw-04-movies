import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: { textAlign: "center" },
  status: { fontSize: 96, marginBottom: 16 },
};

const NotFound = () => (
  <div style={styles.container}>
    <h1 style={styles.status}>404</h1>
    <img
      src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png"
      alt="dd"
    />
    <p>
      упс кажется вы потерялись{" "}
      <Link to="/">Вот ваша ссылка на главную страницу</Link>
    </p>
  </div>
);

export default NotFound;
