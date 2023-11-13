import { useEffect, useState } from "react";
import "./styles.css";
import toast from "react-hot-toast";

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

  const handleDeleteMovie = (movieInfo) => {
    // Configuración de la solicitud DELETE
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("movieInfo");
    console.log(movieInfo);

    // Realizar la solicitud DELETE a tu endpoint de backend
    fetch(`http://localhost:8000/api/deletemovie/${movieInfo.id}`, reqOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al eliminar la película. Código de estado: ${response.status}`
          );
        }
        console.log("Película eliminada correctamente");
        toast.success("Película eliminada correctamente");
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud DELETE:", error);
        toast.error(`Error al realizar la solicitud DELETE:  ${error}`);
        // Manejar errores aquí
      });
  };

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
              <button
                id="deleteMovieButton"
                onClick={() => handleDeleteMovie(movie)}
              >
                Borrar película
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MisPeliculasComponent;
