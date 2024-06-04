import { GiphyFetch } from "@giphy/js-fetch-api";
import React, { useEffect } from "react";

const GifContext = React.createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = React.useState([]);
  const [filter, setFilter] = React.useState("gifs");
  const [favorites, setFavorites] = React.useState([]);
  const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);



  const addToFavorites = (id) => {
    if(favorites.includes(id)) {
        const updatedFav = favorites.filter((fav) => fav !== id);
        localStorage.setItem("favorites", JSON.stringify(updatedFav));
        setFavorites(updatedFav);
    } else {
        const updatedFav = [...favorites, id];
        localStorage.setItem("favorites", JSON.stringify(updatedFav));
        setFavorites(updatedFav);
    }
  }; 
  
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favorites);
  }, []);

  console.log(gif)

  return (
    <GifContext.Provider value={{ gif, gifs, setGifs, filter, setFilter, favorites, setFavorites, addToFavorites }}>
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return React.useContext(GifContext);
};

export default GifProvider;
