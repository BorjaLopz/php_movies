import { useEffect, useState } from "react";
import "./style.css";
import RenderMovies from "../RenderMovies/RenderMovies";
import LoadMoreElementsComponent from "../LoadMoreElementsComponent/LoadMoreElementsComponent";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjg3MzlmYzQ3NDRlODk2MjNkMWJkMDRhMzdkMTdkNSIsInN1YiI6IjY1MjUyNzZhNjI5YjJjMDBlMjY0ZWZhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TqMxuU1_tkE-tfODYg6z_dJ5ugubXI0UnqejoBX4VDo",
  },
};

const API_KEY = "3f8739fc4744e89623d1bd04a37d17d5";

function MainComponent({ movieFiltered }) {
  const [moviesFiltered, setMoviesFiltered] = useState({});
  const [topMovies, setTopMovies] = useState({});
  const [movieCardsToSee, setMovieCardsToSee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPage, setFilteredPage] = useState(1);

  // const handleSetCurrentPage = (data) => {
  //   if (data.page < data.total_pages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  const handleSetCurrentPage = (data, isFilteredData) => {
    const newPage = data.page + 1;
    if (isFilteredData) {
      setFilteredPage(newPage);
      fetchFilteredData(newPage);
    } else {
      setCurrentPage(newPage);
      fetchTopMovies(newPage);
    }
  };

  const fetchFilteredData = async (newPage) => {
    // try {
    //   const resp = await fetch(
    //     `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieFiltered}&language=es&page=${newPage}`
    //   );
    //   const data = await resp.json();
    //   // setCurrentPage(1);
    //   setMoviesFiltered(data);
    //   if (data.page === 1) {
    //     setMovieCardsToSee(data.results);
    //   } else {
    //     setMovieCardsToSee((prevMovieCards) => [
    //       ...prevMovieCards,
    //       ...data.results,
    //     ]);
    //   }
    // } catch (e) {
    //   console.log("Error. Couldn't fetch data. ", e.message);
    // }
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieFiltered}&language=es&page=${newPage}`
      );
      const data = await resp.json();

      setMoviesFiltered(data);
      if (data.page === 1) {
        setMovieCardsToSee(data.results);
        // setCurrentPage(1);
      } else {
        setMovieCardsToSee((prevMovieCards) => [
          ...prevMovieCards,
          ...data.results,
        ]);
        // setCurrentPage(1);
      }
    } catch (e) {
      console.log("Error. Couldn't fetch data. ", e.message);
    }
  };

  const fetchTopMovies = async (newPage) => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=es&page=${newPage}`,
        options
      );
      const data = await resp.json();

      setTopMovies(data);
      if (data.page === 1) {
        setMovieCardsToSee(data.results);
        // setCurrentPage(1);
      } else {
        setMovieCardsToSee((prevMovieCards) => [
          ...prevMovieCards,
          ...data.results,
        ]);
        // setCurrentPage(1);
      }
    } catch (e) {
      console.log("Error. Couldn't fetch data. ", e.message);
    }
  };

  useEffect(() => {
    if (movieFiltered) {
      // Si hay una búsqueda, llama a fetchFilteredData solo una vez al inicio y cuando cambia movieFiltered
      fetchFilteredData(1);
    } else {
      // Si no hay búsqueda, llama a fetchTopMovies solo una vez al inicio y cuando cambia currentPage
      fetchTopMovies(currentPage);
    }
  }, [movieFiltered, currentPage]);

  // useEffect(() => {
  //   fetchFilteredData();
  // }, [movieFiltered]);

  // useEffect(() => {
  //   fetchTopMovies();
  //   fetchFilteredData();
  // }, [currentPage]);

  // useEffect(() => {
  //   fetchTopMovies();
  // }, []);

  // console.log("movieCardsToSee");
  // console.log(movieCardsToSee);
  // console.log("movieFiltered");
  // console.log(movieFiltered);

  return (
    <main className="Main">
      <section id="sectionMoviesFiltered">
        {movieFiltered ? (
          // Mostrar películas filtradas
          moviesFiltered?.total_results !== 0 && (
            <RenderMovies
              render={movieCardsToSee}
              moviesFiltered={moviesFiltered}
            />
          )
        ) : (
          // Mostrar las películas por defecto (topMovies)
          <RenderMovies render={movieCardsToSee} />
        )}
      </section>
      <section id="loadMoreBtn">
        {movieFiltered ? (
          //Load more de movieFiltered
          moviesFiltered?.page !== moviesFiltered?.total_pages && (
            <LoadMoreElementsComponent
              handleSetCurrentPage={() =>
                handleSetCurrentPage(moviesFiltered, true)
              }
            />
          )
        ) : (
          //Load more de topMovies
          <LoadMoreElementsComponent
            handleSetCurrentPage={() => handleSetCurrentPage(topMovies, false)}
          />
        )}
      </section>
    </main>
  );
}

export default MainComponent;
