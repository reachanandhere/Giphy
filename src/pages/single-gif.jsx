import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifcontext";
import Gif from "../components/gif";
import Follow from "../components/follow";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  FaFacebook,
  FaLink,
  FaLinkedin,
  FaPaperPlane,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";
import { HiMiniHeart } from "react-icons/hi2";
import { FaP } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const SingleGif = () => {
  const { type, slug } = useParams();

  const [gifs, setGifs] = useState({});
  const [relatedGif, setRelatedGif] = useState([]);
  const { gif, addToFavorites, favorites } = GifState();
  const [share, setShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const [readMore, setReadMore] = useState(false);

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const copyFacebook = () => {
    window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
  }
  const copyTwitter = () => {
    window.location.href=`https://twitter.com/intent/tweet?url=${window.location.href}`;
  }

  const copyLinkedin=()=>{
    window.location.href=`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`;
  }

  const copyReddit=()=>{
    window.location.href=`https://www.reddit.com/submit?url=${window.location.href}`;
  }

  // function copyURL() {
  //   navigator.clipboard.writeText(window.location.href);
  // }

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gif?.gif(gifId[gifId.length - 1]);
    const { data: related } = await gif?.related(gifId[gifId.length - 1], {
      limit: 20,
    });
    setGifs(data);
    setRelatedGif(related);
  };
  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gifs?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gifs?.user?.avatar_url}
                alt={gifs?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <h2 className="text-xl font-bold">
                  {gifs?.user?.display_name}
                </h2>
                <p className="faded-text">{gifs?.user?.username}</p>
              </div>
            </div>

            {gifs.user.description && (
              <p className="py-4 whitespace-pre-line">
                {readMore
                  ? gifs.user.description
                  : `${gifs.user.description.slice(0, 100)}...`}
                {gifs.user.description.length > 100 && (
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="text-gray-500 cursor-pointer"
                  >
                    {readMore ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
            )}

            <Follow />

            <div className="divider" />

            {gifs?.source && (
              <div>
                <span>Source</span>
                <div className="flex items-center text-sm gap-1 font-bold">
                  <HiOutlineExternalLink size={20} />
                  <a href={gifs.source} target="_blank" className="truncate">
                    {gifs.source}
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4 relative">
            <div className="faded-text truncate mb-2">{gifs.title}</div>

           
            <Gif gif={gifs}  />

            <div className="flex sm:hidden gap-1">
              <img
                src={gifs?.user?.avatar_url}
                alt={gifs?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <h2 className="text-xl font-bold">
                  {gifs?.user?.display_name}
                </h2>
                <p className="faded-text">{gifs?.user?.username}</p>
              </div>
              <button className="ml-auto">
                <FaPaperPlane size={25} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              className="flex gap-6 items-center font-bold"
              onClick={() => addToFavorites(gifs.id)}
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(gifs.id) ? "text-red-500" : ""
                }`}
              />{" "}
              Favorite
            </button>
            <div className="divider"></div>
            <button
              onClick={() => setShare(!share)}
              className="flex gap-6 items-center font-bold"
            >
              <FaPaperPlane size={30} /> Share
            </button>
          
            {share && (
              <div className="hidden sm:block">
                <div className="flex gap-4 z-20 justify-center ">
                  <button className="flex gap-6 items-center font-bold">
                    <FaFacebook
                      size={30}
                      onClick={copyFacebook}
                     
                    />
                  </button>
                  <button onClick={copyTwitter} className="flex gap-6 items-center font-bold">
                    <FaTwitter size={30} />
                  </button>
                  <button onClick={copyLinkedin} className="flex gap-6 items-center font-bold">
                    <FaLinkedin size={30} />
                  </button>
                  <button onClick={copyReddit} className="flex gap-6 items-center font-bold">
                    <FaReddit size={30} />
                  </button>
                </div>
                <button 
                 onClick={copyURL} 
                  className={` ${
                    copied
                      ? "bg-gradient-to-tr from-green-900 to-green-400"
                      : "bg-gradient-to-tr from-purple-900 to-red-700"
                  }  text-lg font-bold w-full mt-4 rounded-md p-2 z-20 text-center`}
                >
                  {!copied? (<span className="flex gap-2 justify-center">
                    Copy GIF Link <FaLink size={22} />{" "}
                  </span>): (<span className="flex gap-2 justify-center">
                    Link Copied{" "}
                  </span>)}
                </button>
              </div>
            )}
              <div className="divider"></div>
            {/* <button className="flex gap-6 items-center font-bold">
              <IoCodeSharp size={30} /> Embed
            </button> */}
          </div>
        </div>

        <div>
          {relatedGif.length > 0 && (
            <div>
              <h2 className="text-2xl faded-text my-3">Related GIFs</h2>
              <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5">
                {relatedGif.map((gif) => (
                  <Gif gif={gif} key={gif?.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
