import { useState } from "react";

function PaginationComponent({ data }) {
  // const [pages] = useState(Math.round(data?.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  console.log("data.total_pages");
  console.log(data.total_pages);

  function goToNextPage() {
    if (currentPage !== data.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  // const getPaginationGroup = () => {
  //   let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  //   return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  // };
  return (
    <>
      <p>{`Current: ${currentPage}`}</p>
      <p>{`Total: ${data.total_pages}`}</p>

      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {/* {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))} */}

        {/* next button */}
        <button
          onClick={goToNextPage}
          // className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </>
  );
}

export default PaginationComponent;
