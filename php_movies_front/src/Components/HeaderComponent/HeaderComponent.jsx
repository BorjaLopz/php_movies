import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

function HeaderComponent({ handleMovieFilter }) {
  const navigate = useNavigate();

  const [filteredMovie, setFilteredMovie] = useState("");
  let inputHandler = (e) => {
    setFilteredMovie(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMovieFilter(filteredMovie);
  };

  const handleClickMovies = () => {
    navigate("/myMovies");
  };

  return (
    <header className="Header">
      <div className="searchBox">
        <h1 onClick={() => navigate("/")}>PHP TMDB</h1>
        <nav className="navLinks">
          <ul>
            <li onClick={handleClickMovies}>Mis peliculas</li>
          </ul>
        </nav>
        <form id="searchForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="searchInput"
            placeholder="Buscar película..."
            onChange={inputHandler}
          />
          <button className="searchBtn" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </header>
  );
}

export default HeaderComponent;
