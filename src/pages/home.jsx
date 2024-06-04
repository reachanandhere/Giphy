import React, { useEffect } from "react";
import { GifState } from "../context/gifcontext";

const Home = () => {
  const { gif, gifs, setGif, setGifs, filter } = GifState();

  const fetchTrendingGifs = async () => {
    const { data } = await gif.trending({
      type: filter,
      limit: 10,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return <div>
        <img src="./banner.gif" alt="Earth banner" className="mt-2 rounded w-full"/> 
  </div>;
};

export default Home;
