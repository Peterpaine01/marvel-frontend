import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

// Components
import Search from "../components/Search";

const Comics = ({}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

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
            return (
              <article
                key={comic._id}
                className="flex-item  item-relative cards"
              >
                <button
                  className="item-absolute flex-item btn-favoris"
                  onClick={() => {
                    // handleFavorisComic(comic);
                  }}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
                <div className="cards-image ">
                  <img
                    src={
                      comic.thumbnail.path +
                      "/portrait_uncanny." +
                      comic.thumbnail.extension
                    }
                    alt={"comics Marvel " + comic.title}
                  />
                </div>
                <div className="cards-bottom ">
                  <div className="cards-title flex-parent item-relative">
                    <h2 className="flex-item ">
                      {addEllipsis(comic.title, 28)}
                    </h2>
                  </div>
                  {/* {comic.description && <p>{comic.description}</p>} */}
                </div>
              </article>
            );
          })}
        </section>
        <section className="pagination">
          <button
            onClick={() => {
              setSkip(0);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            first page
          </button>
          <button
            onClick={() => {
              setSkip(skip + 100);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            next page
          </button>
          <p>
            <span>{currentPage}</span> / <span>{pageNumber}</span>
          </p>
          <button
            onClick={() => {
              setSkip(skip - 100);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            previous page
          </button>
          <button
            onClick={() => {
              setSkip(pageNumber * limit - 100);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            last page
          </button>
        </section>
      </div>
    </main>
  );
};

export default Comics;
