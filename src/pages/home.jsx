import React, { useEffect } from "react";
import { GifState } from "../context/gifcontext";
import Gif from "../components/gif";
import FilterGif from "../components/filter-gif";

const Home = () => {
  const { gif, gifs, setGif, setGifs, filter } = GifState();

  const fetchTrendingGifs = async () => {
    const { data } = await gif.trending({
      type: filter,
      limit: 30,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img
        src="./banner.gif"
        alt="Earth banner"
        className="mt-2 rounded w-full"
      />

        <FilterGif showTrending />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.title} />
        ))}
      </div>
    </div>
  );
};

export default Home;
