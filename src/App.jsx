// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Images
import logo from "./assets/img/Marvel_Logo.png";

// Pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";

// Components
import Header from "./components/Header";

const App = () => {
  const [favorisCharacters, setFavorisCharacters] = useState(
    Cookies.get("favorisCharacters") || null
  );
  // console.log(favorisCharacters);
  const [favorisComics, setFavorisComics] = useState(
    Cookies.get("favorisComics") || null
  );

  // Fonction Favoris
  const handleFavorisCharacter = (character) => {
    // console.log(character);
    // if (favorisCharacters) {
    //   let isFavoris = null;
    //   const newFavorisCharacters = [...favorisCharacters];
    //   console.log(newFavorisCharacters);
    //   for (let i = 0; i < newFavorisCharacters.length; i++) {
    //     const elem = newFavorisCharacters[i];
    //     if (elem._id === character._id) {
    //       isFavoris = elem._id;
    //       console.log(isFavoris);
    //     }
    //   }
    //   if (!isFavoris) {
    //     console.log("pas dans les favoris");
    //     newFavorisCharacters.push(isFavoris);
    //   } else {
    //     console.log("est déjà dans les favoris");
    //     const index = newFavorisCharacters.indexOf(isFavoris);
    //     console.log(index);
    //     newFavorisCharacters.splice(index, 1);
    //   }
    //   Cookies.set("favorisCharacters", newFavorisCharacters, {
    //     expires: 15,
    //   });
    //   // console.log(newFavorisCharacters);
    //   setFavorisCharacters(Cookies.get("favorisCharacters"));
    // } else {
    //   Cookies.remove("favorisCharacters");
    //   setFavorisCharacters(null);
    // }
  };

  const handleFavorisComic = (comic) => {
    // console.log(comic);
    // let isFavoris = null;
    // const newFavorisComics = [...favorisComics];
    // console.log(newFavorisComics);
    // for (let i = 0; i < newFavorisComics.length; i++) {
    //   const elem = newFavorisComics[i];
    //   if (elem._id === comic._id) {
    //     isFavoris = elem;
    //     console.log(isFavoris);
    //   }
    // }
    // if (!isFavoris) {
    //   console.log("pas dans les favoris");
    //   const comicToPush = {
    //     ...comic,
    //   };
    //   newFavorisComics.push(comicToPush);
    // } else {
    //   console.log("est déjà dans les favoris");
    //   const index = newFavorisComics.indexOf(isFavoris);
    //   console.log(index);
    //   newFavorisComics.splice(index, 1);
    // }
    // Cookies.set("favorisComics", JSON.stringify(newFavorisComics), {
    //   expires: 15,
    // });
    // console.log(newFavorisComics);
    // setFavorisComics(JSON.parse(Cookies.get("favorisComics")));
  };

  return (
    <Router>
      <Header logo={logo} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/"
          element={
            <Characters
              handleFavorisCharacter={handleFavorisCharacter}
              favorisCharacters={favorisCharacters}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              handleFavorisComic={handleFavorisComic}
              favorisComics={favorisComics}
            />
          }
        />
        <Route
          path="/favoris"
          element={
            <Favoris
              handleFavorisCharacter={handleFavorisCharacter}
              favorisCharacters={favorisCharacters}
              setFavorisCharacters={setFavorisCharacters}
              favorisComics={favorisComics}
              handleFavorisComic={handleFavorisComic}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
