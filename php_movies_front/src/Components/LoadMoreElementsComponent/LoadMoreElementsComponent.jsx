import "./style.css";

function LoadMoreElementsComponent({ handleSetCurrentPage }) {
  return (
    <section>
      <button className="loadMoreBtn" onClick={handleSetCurrentPage}>
        Load More
      </button>
    </section>
  );
}

export default LoadMoreElementsComponent;
