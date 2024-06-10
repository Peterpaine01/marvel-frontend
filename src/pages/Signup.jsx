import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Je récupère la fonction handleToken en argument
const Signup = ({ handleToken }) => {
  // States qui gèrent mes inputs
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  //   State qui gère les messages d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  //   Permet de naviguer au click après avoir exécuté du code
  const navigate = useNavigate();

  // Fonction qui sera appelée lors de la validation du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //   Je fais disparaitre un éventuel message d'erreur
      setErrorMessage("");
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoi
      const response = await axios.post(
        "https://site--marvel-backend--fklc4pfyn242.code.run/signup",
        {
          email, // email : email
          username,
          password,
          newsletter,
        }
      );
      // J'enregistre le token dans mon state et mes cookies
      handleToken(response.data.token);
      // Je navigue vers ma page /
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log(error.response.status);
      // console.log(error.message);
      if (error.response.data.message === "Missing parameters") {
        // Je met à jour mon state errorMessage
        setErrorMessage("Merci de remplir tous les champs");
      } else if (error.response.status === 409) {
        setErrorMessage(
          "Cette adresse mail est déjà utilisée pour un compte, merci d'en utiliser une autre :)"
        );
      }
    }
  };

  return (
    <>
      <main className="main-white">
        <div className="container signup-login-form">
          <section>
            <h1>S'inscrire</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  name="username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  value={username}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                />
              </div>

              <div>
                <input
                  type="checkbox"
                  name="newsletter"
                  onChange={() => {
                    if (newsletter === true) {
                      setNewsletter(!newsletter);
                    }
                  }}
                  value={newsletter}
                />
                <span>S'inscrire à notre newsletter</span>
              </div>
              <div>
                <p>
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </p>
              </div>

              <div>
                <input
                  className="submit-button btn-solid btn-large"
                  type="submit"
                  value="S'inscrire"
                ></input>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
            </form>
            <p>
              Tu as déjà un compte ? <Link to="/login">Connecte-toi !</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Signup;
