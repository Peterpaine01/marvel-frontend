import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

// Components
import Search from "../components/Search";

// Pages
import Comic from "../pages/Comic";

const Comics = ({ handleFavorisComic, favorisComics }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState();
  const [search, setSearch] = useState("");
  const [comicId, setComicId] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  //   const navigate = useNavigate();

  //   const addEllipsis = (text, maxLength) => {
  //     return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  //   };

  //   const addEllipsisMore = (text, maxLength) => {
  //     return text.length > maxLength
  //       ? text.slice(0, maxLength) + " (Read more...)"
  //       : text;
  //   };

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
    setSkip(value);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--fklc4pfyn242.code.run/comics?title=${search}&skip=${skip}`
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

  const favorisComicsValues = [{}];

  if (!favorisComics) {
    favorisComicsValues = Object.values(favorisComics);
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
        <h1>Comics</h1>
        <section>
          <Search search={search} setSearch={setSearch} kind={"un comics"} />
        </section>
        <div className="modal-container">
          <div
            className="overlay modal-trigger"
            onClick={() => {
              setComicId("");
              toggleModal();
            }}
          ></div>
          <div className="modal">
            <button
              className="close-modal modal-trigger"
              onClick={() => {
                setComicId("");
                toggleModal();
              }}
            >
              X
            </button>
            <Comic
              handleFavorisComic={handleFavorisComic}
              id={comicId}
              favorisComics={favorisComics}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          </div>
        </div>
        <section>
          {favorisComicsValues.map((favori) => {
            return <p key={favori._id}>{favori.title}</p>;
          })}
        </section>
        <section className="flex-parent">
          {data.results.map((comic) => {
            let isFavoris = false;
            const newFavorisComics = [...favorisComics];
            // console.log(newFavorisComics);

            for (let i = 0; i < newFavorisComics.length; i++) {
              const elem = newFavorisComics[i];
              if (elem._id === comic._id) {
                isFavoris = true;
              }
            }

            return (
              <article key={comic._id} className="flex-item item-relative">
                <button
                  className={
                    isFavoris
                      ? "item-absolute btn-favoris favoris"
                      : "item-absolute btn-favoris "
                  }
                  onClick={() => {
                    handleFavorisComic(comic);
                  }}
                >
                  <i className="fa-solid fa-star"></i>
                </button>

                <div
                  className="modal-btn modal-trigger"
                  onClick={() => {
                    setComicId(comic._id);
                    setIsFavorite(isFavoris);
                    toggleModal();
                    // setFavorite(true);
                  }}
                >
                  <div className="">
                    <img
                      src={
                        comic.thumbnail.path +
                        "/portrait_uncanny." +
                        comic.thumbnail.extension
                      }
                      alt={"personnage Marvel" + comic.title}
                    />
                  </div>
                  {/* <h2>{addEllipsis(comic.title, 14)}</h2> */}
                  {/* <p>{addEllipsisMore(comic.description, 100)}</p> */}
                </div>
              </article>
            );
          })}
        </section>
        <section>
          {pagination.map((page) => {
            return (
              <button
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

export default Comics;
