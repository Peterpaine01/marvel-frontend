import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Images
import logo from "./assets/img/Marvel_Logo.png";

// Pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";

const App = () => {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(
    Cookies.get("token") || null
    // Cookies.get("token") ? Cookies.get("token") : null
  );
  const [idUser, setIdUser] = useState(
    Cookies.get("idUser") || null
    // Cookies.get("token") ? Cookies.get("token") : null
  );

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token, idUser) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      Cookies.set("idUser", idUser, { expires: 15 });
      setToken(token);
      setIdUser(idUser);
    } else {
      Cookies.remove("token");
      Cookies.remove("idUser");
      setToken(null);
      setIdUser(null);
    }
  };

  return (
    <Router>
      <Header
        logo={logo}
        token={token}
        idUser={idUser}
        handleToken={handleToken}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route
          path="/signup"
          element={
            <Signup token={token} idUser={idUser} handleToken={handleToken} />
          }
        />
        <Route
          path="/login"
          element={
            <Login token={token} idUser={idUser} handleToken={handleToken} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
