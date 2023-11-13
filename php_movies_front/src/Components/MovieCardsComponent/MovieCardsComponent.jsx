import toast from "react-hot-toast";

function MovieCardsComponents({ movie }) {
  const handleAddClick = (movieInfo) => {
    // Configuramos la solicitud
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieInfo),
    };

    // console.log("movieInfo");
    // console.log(movieInfo);

    // Hacemos fetch a nuestro endpoint
    fetch("http://localhost:8000/api/addmovie", reqOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success("Película añadida exitosamente");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  return (
    <article className="movieCard">
      <div className="column">
        <div className="card">
          <a href="./img-01.jpg" className="cardMedia">
            <img
              src={`${
                movie.poster_path === null
                  ? `/public/comingSoon.svg`
                  : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              }`}
              // src={`/public/comingSoon.svg`}
              // src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title}`}
              width={`100%`}
            />
          </a>
          <div className="card-content">
            <div className="card-header">
              <div className="left-content">
                <h3>{`${
                  movie.title.length > 15
                    ? movie.title.slice(0, 15) + "..."
                    : movie.title
                }`}</h3>
                <span>{`${movie.release_date.split("-")[0]}`}</span>
              </div>

              <div className="right-content">
                <button
                  className="card-btn"
                  onClick={() => handleAddClick(movie)}
                >
                  Añadir
                </button>
              </div>
            </div>
            <div className="info">
              {movie.overview.length === 0 ? (
                <p>{`No hay sinopsis aún...`}</p>
              ) : (
                <p>{`${movie.overview}`}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MovieCardsComponents;
