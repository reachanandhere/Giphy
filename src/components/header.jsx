import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/gifcontext";
import GifSearch from "./git-search";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

    const { gif, filter, setFilter, favorites } = GifState()

    const fetchGiftCategories = async () => {
        const { data } = await gif.categories();
        
        setCategories(data);
    }

    useEffect(() => {
        fetchGiftCategories();
    }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="gap-2 flex">
          <img src="./logo.svg" className="w-8" alt="Logo" />
          <h1 className="tracking-tight text-5xl font-bold cursor-pointer">
            GIPHY
          </h1>
        </Link>

        {}

        <div className="font-bold text-md flex gap-2 items-center">
            {
               categories?.slice(0, 5)?.map((category) => (
                     <Link
                          key={category.name}
                          to={`/${category.name_encoded}`}
                          className="px-4 py-2 hover:gradient border-b-4 hidden lg:block"
                     >
                          {category.name}
                     </Link>
                ))
            }
          <Link
            to="/favorites"
            className="px-4 py-2 hover:gradient border-b-4 hidden lg:block"
          >
            Reactions
          </Link>
          <button onClick={() => setShowCategory(!showCategory)}>
            <HiEllipsisVertical
              size={43}
              className={`py-0.5 hover:gradient ${
                showCategory ? "gradient" : ""
              } border-b-4 hidden lg:block`}
            />
          </button>

        {  favorites.length > 0 && <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favorites">Favorites</Link>
          </div>}
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
        </div>
        {showCategory && (
          <div className="absolute right-0 top-14  px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr  className="bg-gray-100 opacity-50 my-5"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">

                {
                    categories?.map((category) => (
                        <Link
                            key={category.name}
                            to={`/${category.name_encoded}`}
                            className="py-2"
                        >
                            {category.name}
                        </Link>
                    ))
                }
            
            </div>
          </div>
        )}
      </div>


        {/*Search*/}
        {<GifSearch />}

    </nav>
  );
};

export default Header;
