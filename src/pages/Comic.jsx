import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
//import Slider from "react-slick";
import Cookies from "js-cookie";

const Comic = () => {
  const params = useParams();
  const id = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [comicData, setComicData] = useState({});
  //const [comicsData, setComicsData] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [comicsFavorites, setComicsFavorites] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchComicData = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-backend--fklc4pfyn242.code.run/comic/${id}`
          );
          setComicData(response.data);
          setIsLoading(false);

          //fetchComicsData(response.data.comics || []);
        } catch (error) {
          console.log(error.response.data);
        }
      };
      // const fetchComicsData = async (comics) => {
      //   try {
      //     const comicsData = await Promise.all(
      //       comics.map(async (comicId) => {
      //         const response = await axios.get(
      //           `https://site--marvel-backend--vm2w9vyj7r62.code.run/comic/${comicId}`
      //         );
      //         //   console.log("response.data =>>", response.data);
      //         return response.data;
      //       })
      //     );
      //     //   console.log("comicsData ==>", comicsData);
      //     setComicsData(comicsData);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };

      fetchComicData();
    }
  }, [id]);

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

  console.log(comicData);

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

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 6,
  //   slidesToScroll: 6,
  //   initialSlide: 0,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <main className="character-focus">
        <div className="container">
          <section className="flex-parent item-relative character">
            {user ? (
              comicsFavorites.includes(id) ? (
                <button
                  className=" item-absolute flex-item btn-favoris favoris"
                  onClick={() => updateFavorite(id, "delete")}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              ) : (
                <button
                  className=" item-absolute flex-item btn-favoris "
                  onClick={() => updateFavorite(id, "add")}
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
            <div className="main-img">
              <img
                src={
                  comicData.thumbnail.path +
                  "/portrait_uncanny." +
                  comicData.thumbnail.extension
                }
                alt={"comic Marvel" + comicData.title}
              />
            </div>

            <aside>
              <h1>{comicData.title}</h1>

              {comicData.description.length > 0 ? (
                <p>{comicData.description}</p>
              ) : (
                <p>Ce comic n'a pas encore de description.</p>
              )}
            </aside>
          </section>
          {/* <section className="comics-slider">
            <h2>Retrouvez {comicData.name} dans les comics suivants :</h2>

            <Slider {...settings}>
              {comicsData.map((comic) => {
                return (
                  <article className="slide-comics" key={comic._id}>
                    <img
                      src={
                        comic.thumbnail.path +
                        "/standard_fantastic." +
                        comic.thumbnail.extension
                      }
                      alt=""
                    />
                    <h3>{comic.title}</h3>
                  </article>
                );
              })}
            </Slider>
          </section> */}
        </div>
      </main>
    </>
  );
};

export default Comic;
