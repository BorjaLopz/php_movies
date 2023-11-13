import MovieCardsComponents from "../MovieCardsComponent/MovieCardsComponent";
import { useLocation } from "react-router-dom";

function RenderMovies({ render, moviesFiltered = {} }) {

  const location = useLocation();

  // console.log("render");
  // console.log(render);
  if (JSON.stringify(moviesFiltered) !== "{}") {
    return (
      <>
        {render.map((m, id) => {
          return <MovieCardsComponents movie={m} key={id} />;
        })}
      </>
    );
  } else {
    return (
      <>
        {render.map((m, id) => {
          return <MovieCardsComponents movie={m} key={id} />;
        })}
      </>
    );
  }
}

export default RenderMovies;
