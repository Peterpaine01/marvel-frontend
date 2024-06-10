import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //   State qui gère les messages d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        email: user.email,
        password: user.password,
      };
      const response = await axios.post(
        "https://site--marvel-backend--fklc4pfyn242.code.run/login",
        userData
      );
      console.log(response.data);
      handleToken(response.data.token, response.data._id);
      // Cookies.set("id", id, { expires: 15 });

      navigate("/");
    } catch (error) {
      // console.log(error.message);
      if (error.response.data.message === "Missing parameters") {
        // Je met à jour mon state errorMessage
        setErrorMessage("Merci de remplir tous les champs");
      } else if (error.response.status === 401) {
        setErrorMessage("Email ou mot de passe invalide");
      }
    }
  };

  return (
    <>
      <main className="main-white">
        <div className="container signup-login-form">
          <section>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={user.password}
                  onChange={handleChange}
                />
              </label>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button
                type="submit"
                className="submit-button btn-solid btn-large"
              >
                Se connecter
              </button>
            </form>
            <p>
              Pas encore de compte ? <Link to="/signup">Inscris-toi !</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
