export default class MoviesServices {
  _API_GUEST = "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=eba1a5f25c8b0684887f0b70bfe428bc";
  _API_GENRES = "https://api.themoviedb.org/3/genre/movie/list?api_key=eba1a5f25c8b0684887f0b70bfe428bc&language=en-US";
  _API_URL = "https://api.themoviedb.org/3/search/movie?api_key=eba1a5f25c8b0684887f0b70bfe428bc&query=";
  _API_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=eba1a5f25c8b0684887f0b70bfe428bc&page=1`;

  async getRecourse(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("ошибка");
    }
    return await res.json();
  }

  getPopularMovies() {
    return this.getRecourse(this._API_POPULAR);
  }

  getMovies(value) {
    return this.getRecourse(this._API_URL + value);
  }

  getGenres() {
    return this.getRecourse(this._API_GENRES);
  }

  getGuestID() {
    return this.getRecourse(this._API_GUEST);
  }

  getLikeMovies(idGuest) {
    return this.getRecourse(
      `https://api.themoviedb.org/3/guest_session/${idGuest}/rated/movies?api_key=eba1a5f25c8b0684887f0b70bfe428bc&language=en-US&sort_by=created_at.asc`
    );
  }

  getNewPadge(event, value) {
    return this.getRecourse(
      `https://api.themoviedb.org/3/search/movie?api_key=eba1a5f25c8b0684887f0b70bfe428bc&page=${event}&query=` + value
    );
  }

  getNewPadgePopular(event) {
    return this.getRecourse(
      `https://api.themoviedb.org/3/movie/popular?api_key=eba1a5f25c8b0684887f0b70bfe428bc&page=${event}`
    );
  }

  LikeMovies(id, value, idGuest) {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=eba1a5f25c8b0684887f0b70bfe428bc&guest_session_id=${idGuest}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: value,
        }),
      }
    );
  }
}
