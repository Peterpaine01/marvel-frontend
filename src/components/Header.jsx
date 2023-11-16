import { Link } from "react-router-dom";

// Je récupère les props
const Header = (logo, handleSubmit, handleChange, search) => {
  return (
    <>
      <header>
        <div className="top-menu">
          <div className="container flex-parent">
            <Link className="logo" to="/">
              <img src={logo} alt="" />
            </Link>

            <div className="search">
              <form onClick={handleSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Rechercher un personnage"
                  onChange={handleChange}
                  value={search.name}
                />
              </form>
            </div>
            <nav>
              <Link className="btn-light" to={`/personnages`}>
                Personnages
              </Link>
              <Link className="btn-light" to={`/comics`}>
                Comics
              </Link>
              <Link className="btn-solid" to={`/favoris`}>
                Favvoris
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
