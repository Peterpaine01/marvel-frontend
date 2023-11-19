import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// Pages
import Character from "../pages/Character";

const Favoris = ({
  handleFavorisCharacter,
  favorisCharacters,
  favorisComics,
  handleFavorisComic,
}) => {
  const [dataCharacters, setDataCharacters] = useState();
  const [dataComics, setDataComics] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [characterId, setCharacterId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriCharacterValues = Object.values(favorisCharacters);
        const favoriComicValues = Object.values(favorisComics);

        setDataCharacters(favoriCharacterValues);
        setDataComics(favoriComicValues);
        setIsLoading(false);
        console.log(dataCharacters);
      } catch (error) {
        console.log(error.response.dataCharacters);
      }
    };
    fetchData();
  }, []);

  const modalContainer = document.querySelector(".modal-container");

  const toggleModal = () => {
    modalContainer.classList.toggle("active");
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="container">
        <h1>Mes favoris</h1>

        <div className="modal-container">
          <div
            className="overlay modal-trigger"
            onClick={() => {
              setCharacterId("");
              toggleModal();
            }}
          ></div>
          <div className="modal">
            <button
              className="close-modal modal-trigger"
              onClick={() => {
                setCharacterId("");
                toggleModal();
              }}
            >
              X
            </button>
            <Character id={characterId} />
          </div>
        </div>
        <section className="">
          <h2>Personnages</h2>
          <div className="gallery flex-parent">
            {dataCharacters.map((favori) => {
              let isFavoris = false;
              const newFavorisCharacters = [...favorisCharacters];
              console.log(newFavorisCharacters);

              for (let i = 0; i < newFavorisCharacters.length; i++) {
                const elem = newFavorisCharacters[i];
                if (elem._id === favori._id) {
                  isFavoris = true;
                }
              }
              return (
                <article key={favori._id} className="item-relative flex-item">
                  <button
                    className={
                      isFavoris
                        ? "item-absolute btn-favoris favoris"
                        : "item-absolute btn-favoris "
                    }
                    onClick={() => {
                      handleFavorisCharacter(favori);
                    }}
                  >
                    <i className="fa-solid fa-star"></i>
                  </button>
                  <div>
                    <div>
                      <img
                        src={
                          favori.thumbnail.path +
                          "/portrait_uncanny." +
                          favori.thumbnail.extension
                        }
                        alt={"personnage Marvel" + favori.name}
                      />
                    </div>
                    <p>{favori.name}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section className="">
          <h2>Comics</h2>
          <div className="gallery flex-parent">
            {dataComics.map((favori) => {
              let isFavoris = false;
              const newFavorisComics = [...favorisComics];
              console.log(newFavorisComics);

              for (let i = 0; i < newFavorisComics.length; i++) {
                const elem = newFavorisComics[i];
                if (elem._id === favori._id) {
                  isFavoris = true;
                }
              }
              return (
                <article key={favori._id} className="item-relative flex-item">
                  <button
                    className={
                      isFavoris
                        ? "item-absolute btn-favoris favoris"
                        : "item-absolute btn-favoris "
                    }
                    onClick={() => {
                      handleFavorisComic(favori);
                    }}
                  >
                    <i className="fa-solid fa-star"></i>
                  </button>
                  <div>
                    <div>
                      <img
                        src={
                          favori.thumbnail.path +
                          "/portrait_uncanny." +
                          favori.thumbnail.extension
                        }
                        alt={"personnage Marvel" + favori.name}
                      />
                    </div>
                    <p>{favori.name}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Favoris;
