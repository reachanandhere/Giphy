import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifcontext";
import FilterGif from "../components/filter-gif";
import Gif from "../components/gif";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const {gif, filter} = GifState();
  const { query } = useParams();

  const fetchingSearchResults = async () => {
    const { data } = await gif.search(query, {
      limit: 30,
      rating: "g",
      lang: "en",
      type: filter,
    });
    setSearchResults(data);
  };

  useEffect(() => { fetchingSearchResults(); }, [filter, query]);

  return <div className="my-4">
    <h2 className="text-5xl pb-3 font-extrabold">
      {query}
    </h2>
    <FilterGif alignLeft={true} />
    {
      searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {
            searchResults.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))
          }
        </div>
      ) : (
        <span>No Gifs found for {query} found</span>
      )
    }
  </div>;
};

export default Search;
