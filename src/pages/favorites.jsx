import React from 'react'
import { GifState } from '../context/gifcontext';
import Gif from '../components/gif';

const Favorites = () => {
  const {gif, favorites} = GifState();
  const [favoriteGifs, setFavoriteGifs] = React.useState([]);

  const fetchFavoriteGifs = async () => {
    const {data:gifs} = await gif?.gifs(favorites);
    setFavoriteGifs(gifs);
  }

  React.useEffect(() => {
    fetchFavoriteGifs();
  }, [favoriteGifs]);

  return (
    <div className='mt-2'> 
        <span className='faded-text'>My Favorites</span>
        <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5'>
          {favoriteGifs.length>0 && favoriteGifs.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
          </div>
    </div>
  )
}

export default Favorites
