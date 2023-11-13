import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MisPeliculas from "./pages/MisPeliculas";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [movieFiltered, setMovieFiltered] = useState("");

  //Reiniciamos el filtro de las peliculas cuando cambiamos de URL
  useEffect(() => {
    setMovieFiltered("");
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              handleInputChange={setMovieFiltered}
              movieFiltered={movieFiltered}
            />
          }
        />
        <Route path="/myMovies" element={<MisPeliculas />} />
      </Routes>
    </>
  );
}

export default App;
