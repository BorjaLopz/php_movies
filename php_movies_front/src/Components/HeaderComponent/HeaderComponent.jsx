import { useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

function HeaderComponent({ handleMovieFilter }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isActiveHome, setIsActiveHome] = useState(true);
  const [isActiveProfile, setIsActiveProfile] = useState(false);

  const handleWindowChange = () => {
    if (location.pathname === "/") {
      setIsActiveHome(true);
      setIsActiveProfile(false);
    } else {
      setIsActiveHome(false);
      setIsActiveProfile(true);
    }
  };

  const [filteredMovie, setFilteredMovie] = useState("");
  let inputHandler = (e) => {
    setFilteredMovie(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMovieFilter(filteredMovie);
  };

  useEffect(() => {
    handleWindowChange();
  }, [location.pathname]);

  return (
    <header className="Header">
      <div className="searchBox">
        <h1 onClick={() => navigate("/")}>PHP TMDB</h1>
        <nav className="navLinks">
          <ul>
            <li onClick={() => navigate("/")}>
              <img
                src={`${
                  isActiveHome ? "/public/home_active.svg" : "/public/home.svg"
                }`}
                alt=""
              />
              Inicio
            </li>
            <li onClick={() => navigate("/myMovies")}>
              <img
                src={`${
                  isActiveProfile
                    ? "/public/profile_active.svg"
                    : "/public/profile.svg"
                }`}
                alt=""
              />
              Perfil
            </li>
          </ul>
        </nav>
        <form
          id="searchForm"
          onSubmit={handleSubmit}
          className={`${isActiveHome ? "" : "searchBoxDisabled"}`}
        >
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
