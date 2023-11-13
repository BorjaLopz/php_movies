import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function MainPage({ handleInputChange, movieFiltered }) {
  return (
    <>
      <Header handleInputChange={handleInputChange} />
      <Main movieFiltered={movieFiltered} />
      <Footer />
    </>
  );
}

export default MainPage;
