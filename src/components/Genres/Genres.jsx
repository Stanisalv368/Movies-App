import React from "react";

import "./Genre.css";

import { GenresConsumer } from "../../context/GenresContext";

const Genres = ({ genre_ids }) => {
  return (
    <GenresConsumer>
      {(genres) => {
        return (
          <div className="genre">
            {genre_ids.map((id) => (
              <span key={id}>{genres[id]}</span>
            ))}
          </div>
        );
      }}
    </GenresConsumer>
  );
};

export default Genres;
