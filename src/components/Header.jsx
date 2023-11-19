import { Link } from "react-router-dom";

// Images

// Je récupère les props
const Header = ({ logo }) => {
  return (
    <>
      <header>
        <div className="top-menu">
          <div className="container flex-parent">
            <Link className="logo" to="/">
              <img src={logo} alt="" />
            </Link>

            <nav className="flex-parent">
              <Link className="btn-light" to={`/`}>
                Personnages
              </Link>
              <Link className="btn-light" to={`/comics`}>
                Comics
              </Link>
              <Link className="btn-solid" to={`/favoris`}>
                Favoris
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
