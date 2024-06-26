import { Link } from "react-router-dom";

// Images

// Je récupère les props
const Header = ({
  logo,
  token,
  handleToken,
  isAuthenticated,
  update,
  setUpdate,
}) => {
  return (
    <>
      <header>
        <div className="top-menu">
          <div className="container flex-parent">
            <Link className="logo" to="/">
              <img src={logo} alt="" />
            </Link>

            <nav className="flex-parent">
              <Link className="btn-light" to={`/characters`}>
                Personnages
              </Link>
              <Link className="btn-light" to={`/comics`}>
                Comics
              </Link>
              {token ? (
                <Link className="btn-solid" to={`/favoris`}>
                  Favoris
                </Link>
              ) : (
                <>
                  <Link className="btn-light" to={`/login`}>
                    Favoris
                  </Link>
                </>
              )}
              {/* Si token existe, c'est que je suis connecté, j'affiche le bouton déconnexion, sinon j'affiche les 2 autres boutons */}

              {token ? (
                <Link
                  className="btn-red"
                  to={`/login`}
                  onClick={() => {
                    // Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
                    handleToken(null);
                    setUpdate(!update);
                  }}
                >
                  Se déconnecter
                </Link>
              ) : (
                <>
                  <Link className="btn-light" to={`/signup`}>
                    S'inscrire
                  </Link>
                  <Link className="btn-light" to={`/login`}>
                    Se connecter
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      {/* burger menu */}
      <div className="burger-menu">
        <input
          className="hamburger"
          type="checkbox"
          id="icon-menu-burger"
          tabindex="0"
        />
        <label aria-label="Ouvrir menu" for="icon-menu-burger">
          <span></span>
        </label>
        <nav className="flex-parent menu-mobile">
          <Link className="btn-light" to={`/characters`}>
            Personnages
          </Link>
          <Link className="btn-light" to={`/comics`}>
            Comics
          </Link>
          {token ? (
            <Link className="btn-solid" to={`/favoris`}>
              Favoris
            </Link>
          ) : (
            <>
              <Link className="btn-light" to={`/login`}>
                Favoris
              </Link>
            </>
          )}
          {/* Si token existe, c'est que je suis connecté, j'affiche le bouton déconnexion, sinon j'affiche les 2 autres boutons */}

          {token ? (
            <Link
              className="btn-red"
              to={`/login`}
              onClick={() => {
                // Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
                handleToken(null);
                setUpdate(!update);
              }}
            >
              Se déconnecter
            </Link>
          ) : (
            <>
              <Link className="btn-light" to={`/signup`}>
                S'inscrire
              </Link>
              <Link className="btn-light" to={`/login`}>
                Se connecter
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
