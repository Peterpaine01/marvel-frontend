import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Je récupère les props
const Search = ({ search, setSearch, kind }) => {
  const [searchReq, setSearchReq] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchReq(value);
    console.log(searchReq);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearch(searchReq);
    console.log(search);
    navigate("/");
    setSearchReq("");
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            name="name"
            placeholder={`Rechercher des ${kind}`}
            onChange={handleChange}
            value={searchReq}
          />
        </form>
      </div>
    </>
  );
};

export default Search;
