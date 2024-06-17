import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Je récupère les props
const Card = ({ characters, comics, user }) => {
  const results = characters || comics;
  return (
    <>
      {results.map((item) => {
        return (
          <article key={item._id} className="flex-item item-relative cards ">
            {user ? (
              herosFavorites.includes(item._id) ? (
                <button
                  className=" item-absolute flex-item btn-favoris favoris"
                  onClick={() => updateFavorite(item._id, "delete")}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              ) : (
                <button
                  className=" item-absolute flex-item btn-favoris "
                  onClick={() => updateFavorite(item._id, "add")}
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
            <div
              className="item-click "
              onClick={() => {
                navigate(`/${characters ? "character" : "comics"}/${item._id}`);
              }}
            >
              <div className="cards-image ">
                <img
                  src={
                    item.thumbnail.path +
                    "/portrait_uncanny." +
                    item.thumbnail.extension
                  }
                  alt={
                    characters
                      ? "personnage Marvel "
                      : "comics Marvel " + item.name
                  }
                />
              </div>
              <h2 className="flex-item card-title">
                {addEllipsis(item.name, 14)}
              </h2>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default Card;
