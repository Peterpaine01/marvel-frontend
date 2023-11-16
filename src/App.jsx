// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Images
import logo from "./assets/img/Marvel_Logo.png";

// Pages
import Characters from "./pages/Characters";

// Components
import Header from "./components/Header";

const App = () => {
  // States
  const [search, setSearch] = useState("");
  // console.log(logo);

  // Fonctions
  const handleChange = (event) => {
    if (event.target.name === "comic") {
      const value = event.target.value;
      setSearch({
        [event.target.name]: value,
      });

      // console.log(search);
    } else if (event && event.target.name === "name") {
      const value = event.target.value;
      setSearch({
        [event.target.name]: value,
      });

      // console.log(search);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      // setSearch({
      //   ...search,
      // });
    } catch (error) {
      console.log(error.response); // contrairement au error.message d'express
    }
  };

  return (
    <Router>
      <Header
        logo={logo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        search={search}
      />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </Router>
  );
};

export default App;
