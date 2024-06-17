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

  const getTitle = (title) => {
    const regex = /\s*\([^)]*\)\s*/g;
    const shortTitle = title.split(regex);
    return `${shortTitle[0]} ${shortTitle[1]}`;
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <main className="focus">
        <div className="container">
          <section className="flex-parent item-relative detail-item detail-comics">
            <article className="flex-item item-relative cards cards-comics ">
              {user ? (
                comicsFavorites.includes(id) ? (
                  <button
                    className=" item-absolute flex-item btn-favoris favoris"
                    onClick={() => updateFavorite(comicData._id, "delete")}
                  >
                    <i className="fa-solid fa-star"></i>
                  </button>
                ) : (
                  <button
                    className=" item-absolute flex-item btn-favoris "
                    onClick={() => updateFavorite(comicData._id, "add")}
                  >
                    <i className="fa-solid fa-star"></i>
                  </button>
                )
              ) : (
                <Link
                  className=" item-absolute flex-item btn-favoris "
                  to={`/login`}
                >
                  <i className="fa-solid fa-star"></i>
                </Link>
              )}
              <div className="item-click ">
                <div className="cards-image ">
                  <img
                    src={
                      comicData.thumbnail.path +
                      "/portrait_uncanny." +
                      comicData.thumbnail.extension
                    }
                    alt={"comics Marvel " + getTitle(comicData.title)}
                  />
                </div>
              </div>
            </article>

            <aside>
              <h1>{getTitle(comicData.title)}</h1>
              <div className="description">
                {comicData.description.length > 0 ? (
                  <p>{comicData.description}</p>
                ) : (
                  <p>Ce comics n'a pas encore de description.</p>
                )}
              </div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
};

export default Comic;
