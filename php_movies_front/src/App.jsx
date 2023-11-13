import "./App.css";
import { Toaster } from "react-hot-toast";
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
      <Toaster position="top-right" reverseOrder={false} />
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
