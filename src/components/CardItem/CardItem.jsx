import React from "react";
import "./CardItem.css";
import format from "date-fns/format";

import Stars from "../Stars/Stars";
import Genres from "../Genres/Genres";

const API_IMG = "https://image.tmdb.org/t/p/w500";
const API_NOT = "/xAuR564U2njKKcXSbfbq36rZLeA.jpg";
const CardItem = ({ title, poster_path, overview, release_date, vote_average, genre_ids, like, id }) => {
  const date = release_date === "" ? "неивестно" : format(new Date(release_date), "PP");

  const shorten = function (str, maxLen, separator = " ") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + " ...";
  };
  const text = shorten(overview, 180);
  const poster = poster_path === null ? API_IMG + API_NOT : API_IMG + poster_path;

  const grade = vote_average.toFixed(1);
  let clazz = "elipse-box";

  if (grade <= 3) {
    clazz += " elipse-box-red";
  }
  if (grade > 3 && grade <= 5) {
    clazz += " elipse-box-orange";
  }
  if (grade > 5 && grade <= 7) {
    clazz += " elipse-box-yelow";
  }
  if (grade > 7) {
    clazz += " elipse-box-green";
  }

  let sessionRating;
  if (sessionStorage.getItem(id)) {
    sessionRating = sessionStorage.getItem(id);
  }

  return (
    <div className="card-item">
      <div className="img-box">
        <img className="elipse" src={poster} alt={title}></img>
      </div>
      <div className={clazz}>
        <span className="rated">{grade}</span>
      </div>
      <div className="info-movies">
        <span className="title">{title}</span>
        <span className="date">{date}</span>
        <Genres genre_ids={genre_ids} />
        <p className="descriptionn">{text}</p>
        <Stars like={like} id={id} rating={sessionRating} />
      </div>
    </div>
  );
};

export default CardItem;
