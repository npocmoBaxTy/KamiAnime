import { FC } from "react";
import { IAnime } from "../../models/Product";
import { CiHeart } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaYoutube, FaHeart } from "react-icons/fa";
import { useAuth } from "../../Providers/AuthContext/AuthContext";
import useLikeAnime from "../../utils/useLikeAnime";
import useAddWatchlist from "../../hooks/useAddWatchList";

interface IAnimeImage {
  anime: IAnime;
  setIndexTab: (index: number) => void;
}

const AnimeImage: FC<IAnimeImage> = ({ anime, setIndexTab }) => {
  const { user } = useAuth();
  const { addLike } = useLikeAnime();
  const { addToWatchlist } = useAddWatchlist();
  return (
    <div className="anime__img overflow-hidden relative">
      <div className="anime__img w-full">
        <img
          src={anime.coverImage.extraLarge}
          className="anime__img-component rounded-t-md h-[450px] md:w-[100vw] lg:w-full w-full lg:h-[550px]"
          alt={anime.title.english}
        />
      </div>
      <div className="anime__img--options absolute pt-20 left-0 bottom-0 w-full bg-gradient-to-t from-[#0a0a0a] via-black/70 to-transparent p-3 flex items-center gap-3 ">
        <div onClick={() => addToWatchlist(anime.id)}>
          {user?.watchlist?.includes(anime.id) ? (
            <button className="flex items-center gap-1 anime__img--option black-bg text-white text-sm cursor-pointer">
              <FaMinus />
              <span>Remove from watch list</span>
            </button>
          ) : (
            <button className="flex items-center gap-1 anime__img--option black-bg text-white text-sm cursor-pointer">
              <FaPlus />
              <span>Add to watch list</span>
            </button>
          )}
        </div>
        <button
          onClick={() => setIndexTab(3)}
          className="anime__img--option black-bg text-white text-sm cursor-pointer"
        >
          <FaYoutube />
        </button>
        <button
          onClick={() => addLike(anime.id)}
          className="anime__img--option black-bg text-white text-sm cursor-pointer"
        >
          {user?.liked?.includes(anime.id) ? (
            <FaHeart fill="red" />
          ) : (
            <CiHeart />
          )}
        </button>
      </div>
    </div>
  );
};

export default AnimeImage;
