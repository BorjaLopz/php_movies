import { useEffect, useState } from "react";
import "./styles.css";

function MisPeliculasComponent() {
  const [databaseMovies, setDatabaseMovies] = useState([]);

  const fetchDatabaseMovies = async () => {
    try {
      const data = await fetch("http://localhost:8000/api/getmovies");

      const jsonData = await data.json();

      setDatabaseMovies(jsonData);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  useEffect(() => {
    fetchDatabaseMovies();
  }, []);

  return (
    <main className="Main">
      <h1>Mis películas</h1>
      <section className="listadoPeliculas">
        {databaseMovies.map((movie) => (
          <article key={movie._id} className="pelicula">
            <div className="movieInfo">
              <h3>{movie.title}</h3>
              <h3>{movie.rating}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.imagen}`}
                alt=""
              />
            <button>Borrar película</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MisPeliculasComponent;
