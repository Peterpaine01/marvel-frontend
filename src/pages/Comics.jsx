import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Components
import Search from "../components/Search";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);
  const [comicsFavorites, setComicsFavorites] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [update, setUpdate] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const navigate = useNavigate();

  const addEllipsis = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const pageNumber = Math.round(count / limit);
  const pagination = [];
  for (let i = 0; i < pageNumber; i++) {
    pagination.push(i + 1);
  }

  const currentPage = skip / limit + 1;
  console.log(currentPage);

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

  useEffect(() => {
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
          setComicsFavorites(response.data.user.favorites.favoritesComics);
        } catch (err) {
          console.log(err);
        }
      };
      setIsAuthenticated(true);
      fetchUser();
    }
  }, [isAuthenticated, update, token]);

  console.log(user);

  const updateFavorite = async (id, method) => {
    try {
      const token = Cookies.get("token");
      await axios({
        method: "put",
        url: `https://site--marvel-backend--fklc4pfyn242.code.run/update/comics/${id}?method=${method}`,
        headers: { Authorization: "Bearer " + token },
      });
      setUpdate(!update);
    } catch (err) {
      console.log(err);
    }
  };

  const getTitle = (title) => {
    const regex = /\s*\([^)]*\)\s*/g;
    const shortTitle = title.split(regex);
    return `${shortTitle[0]}`;
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="container">
        <section className="flex-parent page-title">
          <h1>Comics</h1>
          <Search
            search={search}
            setSearch={setSearch}
            kind={"un comics"}
            destination={"/comics"}
          />
        </section>
        <section className="flex-parent">
          {data.results.map((comic) => {
            console.log(comicsFavorites.includes(comic._id) + comic._id);
            return (
              <article
                key={comic._id}
                className="flex-item  item-relative cards cards-title"
              >
                {user ? (
                  comicsFavorites.includes(comic._id) ? (
                    <button
                      className=" item-absolute flex-item btn-favoris favoris"
                      onClick={() => updateFavorite(comic._id, "delete")}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  ) : (
                    <button
                      className=" item-absolute flex-item btn-favoris "
                      onClick={() => updateFavorite(comic._id, "add")}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  )
                ) : (
                  <Link
                    className=" item-absolute flex-item btn-favoris favoris"
                    to={`/login`}
                  >
                    <i className="fa-solid fa-star"></i>
                  </Link>
                )}
                <div
                  className="modal-btn modal-trigger item-click "
                  onClick={() => {
                    navigate(`/comic/${comic._id}`);
                  }}
                >
                  <div className="cards-image ">
                    <img
                      className="clickable-img"
                      src={
                        comic.thumbnail.path +
                        "/portrait_uncanny." +
                        comic.thumbnail.extension
                      }
                      alt={"comics Marvel " + comic.title}
                    />
                  </div>
                  <div className="wrap-title">
                    <h2 className="flex-item card-title-comics">
                      {getTitle(comic.title)}
                    </h2>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
        <section className="section-pagination flex-parent">
          <button
            onClick={() => {
              setSkip(0);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            <i className="fa-solid fa-angles-left" aria-hidden="true"></i>
          </button>

          <button
            onClick={() => {
              setSkip(skip - 100);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
          </button>
          <p>
            <span>{currentPage}</span> / <span>{pageNumber}</span>
          </p>
          <button
            onClick={() => {
              setSkip(skip + 100);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
          </button>
          <button
            onClick={() => {
              setSkip(pageNumber * limit - 100);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            <i className="fa-solid fa-angles-right" aria-hidden="true"></i>
          </button>
        </section>
      </div>
    </main>
  );
};

export default Comics;
