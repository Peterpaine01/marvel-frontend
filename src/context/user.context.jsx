import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState(false);
  const [comicsFavorites, setComicsFavorites] = useState([]);
  const [herosFavorites, setHerosFavorites] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--fklc4pfyn242.code.run/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
        setComicsFavorites(response.data.user.favorites.favoritesComics);
        setHerosFavorites(response.data.user.favorites.favoritesHero);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      setIsAuthenticated(true);
      fetchUser();
    }
  }, [isAuthenticated, update]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  const handleSignin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogout,
        handleSignin,
        user,
        update,
        setUpdate,
        comicsFavorites,
        herosFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
