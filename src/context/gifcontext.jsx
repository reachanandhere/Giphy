import { GiphyFetch } from "@giphy/js-fetch-api";
import React from "react";

const GifContext = React.createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = React.useState([]);
  const [filter, setFilter] = React.useState("gifs");
  const [favorites, setFavorites] = React.useState([]);
  const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  //console.log(gif)

  return (
    <GifContext.Provider value={{ gif, gifs, setGifs, filter, setFilter, favorites, setFavorites }}>
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return React.useContext(GifContext);
};

export default GifProvider;
