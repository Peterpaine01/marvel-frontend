import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = ({ logo }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const addEllipsis = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const addEllipsisMore = (text, maxLength) => {
    return text.length > maxLength
      ? text.slice(0, maxLength) + " (Read more...)"
      : text;
  };

  console.log(logo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--fklc4pfyn242.code.run/characters`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="container">
        <h1>Personnages</h1>

        <section className="flex-parent">
          {data.results.map((character) => {
            return (
              <Link
                className="flex-item"
                to={`/character/${character._id}`}
                key={character._id}
              >
                <article>
                  <div>
                    <img
                      src={
                        character.thumbnail.path +
                        "/portrait_uncanny." +
                        character.thumbnail.extension
                      }
                      alt={"personnage Marvel" + character.name}
                    />
                  </div>
                  <h2>{addEllipsis(character.name, 14)}</h2>
                  <p>{addEllipsisMore(character.description, 100)}</p>
                </article>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Characters;
