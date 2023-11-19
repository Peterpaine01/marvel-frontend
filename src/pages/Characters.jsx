import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

// Components
import Search from "../components/Search";

// Pages
import Character from "../pages/Character";

const Characters = ({ handleFavorisCharacter, favorisCharacters }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  //   const navigate = useNavigate();

  const addEllipsis = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const addEllipsisMore = (text, maxLength) => {
    return text.length > maxLength
      ? text.slice(0, maxLength) + " (Read more...)"
      : text;
  };

  const pageNumber = Math.round(count / limit);
  const pagination = [];
  for (let i = 0; i < pageNumber; i++) {
    pagination.push(i + 1);
  }

  const handlePage = (event, value) => {
    const elems = document.querySelector(".current");
    if (elems !== null) {
      elems.classList.remove("current");
      elems.removeAttribute("disabled");
    }
    event.target.className = "current";
    event.target.setAttribute("disabled", "");
    // console.log(value);
    const newValue = value - 1;
    setSkip(newValue * limit);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--fklc4pfyn242.code.run/characters?name=${search}&skip=${skip}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        setCount(response.data.count);
        setLimit(response.data.limit);

        // console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [search, skip]);

  const favorisCharactersValues = [{}];

  if (!favorisCharacters) {
    favorisCharactersValues = Object.values(favorisCharacters);
  }

  const modalContainer = document.querySelector(".modal-container");

  const toggleModal = () => {
    modalContainer.classList.toggle("active");
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="container">
        <section className="flex-parent page-title">
          <h1>Personnages</h1>
          <Search
            search={search}
            setSearch={setSearch}
            kind={"un personnage"}
            destination={"/"}
          />
        </section>
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
              <i className="fa-solid fa-xmark"></i>
            </button>
            <Character
              handleFavorisCharacter={handleFavorisCharacter}
              id={characterId}
              favorisCharacters={favorisCharacters}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          </div>
        </div>
        <section className="content">
          {favorisCharactersValues.map((favori) => {
            return <p key={favori._id}>{favori.name}</p>;
          })}
        </section>
        <section className="flex-parent">
          {data.results.map((character) => {
            let isFavoris = false;
            const newFavorisCharacters = [...favorisCharacters];
            // console.log(newFavorisCharacters);

            for (let i = 0; i < newFavorisCharacters.length; i++) {
              const elem = newFavorisCharacters[i];
              if (elem._id === character._id) {
                isFavoris = true;
              }
            }

            return (
              <article
                key={character._id}
                className="flex-item item-relative item-click cards modal-btn modal-trigger"
                onClick={() => {
                  setCharacterId(character._id);
                  setIsFavorite(isFavoris);
                  toggleModal();
                }}
              >
                <button
                  className={
                    isFavoris
                      ? "item-absolute flex-item btn-favoris favoris"
                      : " item-absolute flex-item btn-favoris "
                  }
                  onClick={() => {
                    handleFavorisCharacter(character);
                  }}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
                <div className="cards-image ">
                  <img
                    src={
                      character.thumbnail.path +
                      "/portrait_uncanny." +
                      character.thumbnail.extension
                    }
                    alt={"personnage Marvel " + character.name}
                  />
                </div>
                <div className="cards-bottom ">
                  <div className="cards-title flex-parent item-relative">
                    <h2 className="flex-item">
                      {addEllipsis(character.name, 14)}
                    </h2>
                  </div>
                  {character.description && (
                    <p>{addEllipsisMore(character.description, 100)}</p>
                  )}
                </div>
              </article>
            );
          })}
        </section>
        <section className="pagination">
          {pagination.map((page) => {
            return (
              <button
                className={skip === page - 1 / limit && "current"}
                onClick={(event) => {
                  handlePage(event, page);
                }}
                key={page}
              >
                {page}
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Characters;
