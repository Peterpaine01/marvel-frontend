import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
// import Cookies from "js-cookie";
// useParams

const Characters = ({
  id,
  favorisCharacters,
  handleFavorisCharacter,
  isFavorite,
  setIsFavorite,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState({});
  const [comicsData, setComicsData] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchCharacterData = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-backend--fklc4pfyn242.code.run/character/${id}`
          );
          setCharacterData(response.data);
          setIsLoading(false);

          fetchComicsData(response.data.comics || []);
        } catch (error) {
          console.log(error.response.data);
        }
      };
      const fetchComicsData = async (comics) => {
        try {
          const comicsData = await Promise.all(
            comics.map(async (comicId) => {
              const response = await axios.get(
                `https://site--marvel-backend--vm2w9vyj7r62.code.run/comic/${comicId}`
              );
              //   console.log("response.data =>>", response.data);
              return response.data;
            })
          );
          //   console.log("comicsData ==>", comicsData);
          setComicsData(comicsData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchCharacterData();
    }
  }, [id]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    initialSlide: 0,
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

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <main className="character-focus">
        <section className="flex-parent item-relative character">
          <button
            className={
              isFavorite
                ? "item-absolute btn-favoris favoris"
                : "item-absolute btn-favoris "
            }
            onClick={() => {
              handleFavorisCharacter(characterData);
              if (isFavorite) {
                setIsFavorite(false);
              } else {
                setIsFavorite(true);
              }
            }}
          >
            <i className="fa-solid fa-star"></i>
          </button>
          <div className="main-img">
            <img
              src={
                characterData.thumbnail.path +
                "/portrait_uncanny." +
                characterData.thumbnail.extension
              }
              alt={"personnage Marvel" + characterData.name}
            />
          </div>

          <aside>
            <h1>{characterData.name}</h1>
            <h2>Description</h2>
            {characterData.description.length > 0 ? (
              <p>{characterData.description}</p>
            ) : (
              <p>Ce personnage n'a pas encore de description.</p>
            )}
          </aside>
        </section>
        <section className="comics-slider">
          <h2>Retrouvez {characterData.name} dans les comics suivants :</h2>

          <Slider {...settings}>
            {comicsData.map((comic) => {
              return (
                <article className="slide-comics" key={comic._id}>
                  <img
                    src={
                      comic.thumbnail.path +
                      "/portrait_uncanny." +
                      comic.thumbnail.extension
                    }
                    alt=""
                  />
                  <h3>{comic.title}</h3>
                </article>
              );
            })}
          </Slider>
        </section>
      </main>
    </>
  );
};

export default Characters;
