import React, { useEffect } from "react";
import Gif from "../components/gif";
import { GifState } from "../context/gifcontext";
import { useParams } from "react-router-dom";
import Follow from "../components/follow";

const Categories = () => {
  const [results, setResults] = React.useState([]);
  const { gif } = GifState();
  const { category } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await gif.gifs(category, category);
    setResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-5 ">
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]} hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <Follow />
        <div className="divider"></div>
      </div>
      <div className="text-4xl pb-1 font-extrabold">
        <h2 className="capitalize">{category.split("-").join(" & ")} GIFs</h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer"> @{category}</h2>

        {
          results.length > 0 && (
            <div>
              <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5">
                {results.slice(1).map((gif) => (
                  <Gif gif={gif} key={gif.id} />
                ))}
              </div>

            </div>
          )
        }
      </div>
    </div>
  );
};

export default Categories;
