import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MisPeliculas from "./pages/MisPeliculas";

function App() {
  const [movieFiltered, setMovieFiltered] = useState("");

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
