import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Input, Pagination, Tabs } from "antd";

import MoviesServices from "../Services/MoviesServices";

import CardList from "./CardList/CardList";
import InfoForm from "./InfoForm/InfoForm";
import Spinner from "./Spinner/Spinner";
import Spacee from "./Space/Space";
import { GenresProvider } from "./GenresContext/GenresContext";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [results, setResults] = useState(null);
  const [genres, setGenres] = useState([]);
  const [idGuest, setIdGuest] = useState();
  const [tabs, setTabs] = useState(false);
  const [moviesLike, setMoviesLike] = useState([]);

  const swapi = new MoviesServices();

  useEffect(() => {
    swapi.getPopularMovies().then((data) => {
      setMovies(data.results);
      setResults(data.total_results);
    });
  }, []);

  useEffect(() => {
    swapi.getGenres().then((data) => setGenres(Object.fromEntries(data.genres.map((n) => [n.id, n.name]))));
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("guestID") === null) {
      swapi.getGuestID().then((data) => {
        setIdGuest(data.guest_session_id);
        sessionStorage.setItem("guestID", data.guest_session_id);
      });
    }
    setIdGuest(sessionStorage.getItem("guestID"));
  }, []);

  function onChangeInput(event) {
    setLoader(true);
    setInfo(false);
    const inputValue = event.target.value;
    setValueSearch(inputValue);
    swapi
      .getMovies(inputValue)
      .then((data) => {
        setResults(data.total_results);
        if (data.results.length === 0) {
          setInfo(true);
        }
        setMovies(data.results);
        setLoader(false);
        setError(false);
      })
      .catch(() => {
        setLoader(false);
        setError(true);
      });
  }

  const onChangeInpput = debounce(onChangeInput, 400);

  function like(value, id) {
    swapi.LikeMovies(id, value, idGuest);
    sessionStorage.setItem(id, value);
  }

  function onTabs(key) {
    setLoader(true);
    setInfo(false);
    setError(false);
    if (key === "2") {
      swapi.getLikeMovies(idGuest).then((data) => {
        setMoviesLike(data.results);
        setTabs(!tabs);
        setLoader(false);
      });
    } else {
      setTabs(!tabs);
      setLoader(false);
    }
  }

  function onChangePag(event) {
    if (valueSearch === "") {
      swapi.getNewPadgePopular(event).then((data) => setMovies(data.results));
    } else {
      swapi.getNewPadge(event, valueSearch).then((data) => {
        setMovies(data.results);
      });
    }
  }

  const spinner = loader ? <Spinner /> : null;
  const content = !loader && !error ? <CardList movies={tabs ? moviesLike : movies} like={like} /> : null;
  const errrr = error ? <Spacee /> : null;
  const infoform = info ? <InfoForm /> : null;

  const items = [
    {
      key: "1",
      label: `Search`,
      children: (
        <React.Fragment>
          <GenresProvider value={genres}>
            <div className="input">
              <Input placeholder="Type to search..." onChange={onChangeInpput} />
            </div>
            <div className="container">
              {infoform}
              {spinner}
              {content}
              {errrr}
            </div>
            <Pagination
              defaultCurrent
              total={results}
              pageSize={20}
              onChange={onChangePag}
              hideOnSinglePage={true}
              showSizeChanger={false}
            />
          </GenresProvider>
        </React.Fragment>
      ),
    },
    {
      key: "2",
      label: `Rated`,
      children: (
        <React.Fragment>
          <GenresProvider value={genres}>
            <div className="container">
              {infoform}
              {spinner}
              {content}
              {errrr}
            </div>
          </GenresProvider>
        </React.Fragment>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onTabs} />;
};

export default App;
