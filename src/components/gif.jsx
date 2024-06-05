import React from "react";
import { Link } from "react-router-dom";

const Gif = ({ gif, hover = true, share=false }) => {
  return (
    <Link className={`${share?"-z-10":"z-10"}`} to={`/${gif.type}s/${gif.slug}`}>
      <div className="w-full mb-2 relative cursor-pointer group aspect-video">
        <img
          src={gif?.images?.fixed_width.webp}
          alt={gif?.title}
          className={`rounded w-full transition-all duration-300  ${share? "opacity-20 -z-10":""}`}
        />
        {hover && (
          <div className="absolute rounded opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black font-black flex items-end gap-2 p-2">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-8"
            />
            <span className="text-sm">{gif?.user?.display_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Gif;
