import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Cookies from "js-cookie";

const Favoris = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [herosFavorites, setHerosFavorites] = useState([]);
  const [comicsFavorites, setComicsFavorites] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const navigate = useNavigate();

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
          setIsLoading(false);
          setUser(response.data.user);
          fetchHerosFavorites(response.data.user.favorites.favoritesHero);
          fetchComicsFavorites(response.data.user.favorites.favoritesComics);
        } catch (err) {
          console.log(err);
        }
      };
      const fetchHerosFavorites = async (favoritesHero) => {
        try {
          const herosFavorites = await Promise.all(
            favoritesHero.map(async (characterId) => {
              const response = await axios.get(
                `https://site--marvel-backend--fklc4pfyn242.code.run/character/${characterId}`
              );
              console.log("response.data =>>", response.data);
              return response.data;
            })
          );
          console.log("herosFavorites ==>", herosFavorites);
          setHerosFavorites(herosFavorites);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchComicsFavorites = async (favoritesComics) => {
        try {
          const comicsFavorites = await Promise.all(
            favoritesComics.map(async (comicId) => {
              const response = await axios.get(
                `https://site--marvel-backend--fklc4pfyn242.code.run/comic/${comicId}`
              );
              //   console.log("response.data =>>", response.data);
              return response.data;
            })
          );
          //   console.log("comicsData ==>", comicsData);
          setComicsFavorites(comicsFavorites);
        } catch (error) {
          console.log(error);
        }
      };
      setIsAuthenticated(true);
      fetchUser();
    }
  }, [isAuthenticated, update, token]);

  console.log(herosFavorites);
  console.log(comicsFavorites);

  const getTitle = (title) => {
    const regex = /\s*\([^)]*\)\s*/g;
    const shortTitle = title.split(regex);
    return `${shortTitle[0]}`;
  };

  const updateFavorite = async (id, method, type) => {
    try {
      const token = Cookies.get("token");
      await axios({
        method: "put",
        url: `https://site--marvel-backend--fklc4pfyn242.code.run/update/${type}/${id}?method=${method}`,
        headers: { Authorization: "Bearer " + token },
      });
      setUpdate(!update);
    } catch (err) {
      console.log(err);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="fa-solid fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-prev">
        <i className="fa-solid fa-angle-right"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getName = (name) => {
    const shortName = name.split(" (");
    return shortName[0];
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      {user ? (
        <div className="container fav-container">
          <h1>
            <i className="fa-regular fa-star"></i> Mes favoris{" "}
            <i className="fa-regular fa-star"></i>
          </h1>

          <section className="fav-section">
            <h2>Personnages</h2>
            <Slider {...settings}>
              {herosFavorites.map((hero) => {
                return (
                  <div
                    key={hero._id}
                    className="flex-item item-relative outer-cards "
                  >
                    <article className="inner-cards cards">
                      <button
                        className=" item-absolute flex-item btn-favoris favoris"
                        onClick={() =>
                          updateFavorite(hero._id, "delete", "heros")
                        }
                      >
                        <i className="fa-solid fa-star"></i>
                      </button>

                      <div
                        className="item-click "
                        onClick={() => {
                          navigate(`/character/${hero._id}`);
                        }}
                      >
                        <div className="cards-image ">
                          <img
                            className="clickable-img"
                            src={
                              hero.thumbnail.path +
                              "/portrait_uncanny." +
                              hero.thumbnail.extension
                            }
                            alt={"personnage Marvel " + getName(hero.name)}
                          />
                        </div>
                      </div>
                    </article>
                    <h3>{getName(hero.name)}</h3>
                  </div>
                );
              })}
            </Slider>
          </section>
          <section className="fav-section">
            <h2>Comics</h2>
            <Slider {...settings}>
              {comicsFavorites.map((comic) => {
                return (
                  <div key={comic._id}>
                    <article className="item-relative slide-comics">
                      <button
                        className=" item-absolute flex-item btn-favoris favoris"
                        onClick={() =>
                          updateFavorite(comic._id, "delete", "comics")
                        }
                      >
                        <i className="fa-solid fa-star"></i>
                      </button>
                      <div
                        className="item-click "
                        onClick={() => {
                          navigate(`/comic/${comic._id}`);
                        }}
                      >
                        <div className="red-border">
                          <img
                            src={
                              comic.thumbnail.path +
                              "/portrait_uncanny." +
                              comic.thumbnail.extension
                            }
                            alt={"comics Marvel " + getTitle(comic.title)}
                          />
                        </div>
                      </div>
                    </article>
                    <h3>{getTitle(comic.title)}</h3>
                  </div>
                );
              })}
            </Slider>
          </section>
        </div>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </main>
  );
};

export default Favoris;
