import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Components
import Search from "../components/Search";

// Pages
// import Character from "../pages/Character";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [herosFavorites, setHerosFavorites] = useState([]);

  const navigate = useNavigate();

  const addEllipsis = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-backend--fklc4pfyn242.code.run/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data.user);
          setHerosFavorites(response.data.user.favorites.favoritesHero);
        } catch (err) {
          console.log(err);
        }
      };
      setIsAuthenticated(true);
      fetchUser();
    }
  }, [isAuthenticated, update]);

  console.log(user);

  const updateFavorite = async (id, method) => {
    try {
      const token = Cookies.get("token");
      await axios({
        method: "put",
        url: `https://site--marvel-backend--fklc4pfyn242.code.run/update/heros/${id}?method=${method}`,
        headers: { Authorization: "Bearer " + token },
      });
      setUpdate(!update);
    } catch (err) {
      console.log(err);
    }
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

        <section className="flex-parent">
          {data.results.map((character) => {
            return (
              <article
                key={character._id}
                className="flex-item item-relative cards "
              >
                {/* <button
                  className=" item-absolute flex-item btn-favoris "
                  onClick={() => {}}
                >
                  <i className="fa-solid fa-star"></i>
                </button> */}
                {user ? (
                  herosFavorites.includes(character._id) ? (
                    <button
                      className=" item-absolute flex-item btn-favoris favoris"
                      onClick={() => updateFavorite(character._id, "delete")}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  ) : (
                    <button
                      className=" item-absolute flex-item btn-favoris "
                      onClick={() => updateFavorite(character._id, "add")}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  )
                ) : (
                  <p className="not-co">
                    Connectez-vous pour ajouter ceci à vos favoris
                  </p>
                )}
                <div
                  className="modal-btn modal-trigger item-click "
                  onClick={() => {
                    // setCharacterId(character._id);
                    navigate(`/character/${character._id}`);
                  }}
                >
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
                  </div>
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
