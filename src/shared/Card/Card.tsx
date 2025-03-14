import { NavLink } from "react-router-dom";
import { IAnime } from "../../models/Product";
import { LuEye } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FC, useEffect } from "react";
import "./Card.css";
import { useAuth } from "../../Providers/AuthContext/AuthContext";
import useLikeAnime from "../../utils/useLikeAnime";

interface ICard {
  anime: IAnime;
  gridSystem?: string;
}

const Card: FC<ICard> = ({ anime, gridSystem }) => {
  const { user } = useAuth();
  const { addLike } = useLikeAnime();

  useEffect(() => {}, [user]);
  return (
    <div
      className={`anime__card rounded-md flex flex-col p-1 ${
        gridSystem === "row" && "column--card"
      }`}
      key={anime.id}
    >
      <div className="anime__card--img max-h-60 lg:max-h-[300px] relative overflow-hidden">
        <LazyLoadImage
          src={anime.coverImage.extraLarge}
          alt={anime.title.english}
          width={"100%"}
          effect="blur"
          className="h-60 w-full lg:h-[300px]"
        />
        {anime.meanScore && (
          <span className="inline-block absolute bg-green-500 text-white left-2 top-2 p-2 rounded-lg">
            {anime.meanScore}
          </span>
        )}
        <span
          onClick={() => addLike(anime.id)}
          className="inline-block absolute border bg-white text-black right-2 top-2 p-2 rounded-lg cursor-pointer"
        >
          {user?.liked?.includes(anime.id) ? (
            <FaHeart fill="red" />
          ) : (
            <CiHeart />
          )}
        </span>
      </div>
      <div className="anime__card--info h-28 flex flex-col justify-around p-2 text-sm lg:text-[16px] bg-[#17151b] text-gray-300">
        <NavLink
          to={`/animes/anime/${anime.id}`}
          className="anime__info--title "
        >
          <span className="line-clamp-2 text-ellipsis orange-text lg:my-1">
            {anime.title.romaji}
          </span>
          <span>Episodes:{anime.episodes ? anime.episodes : 1}</span>
        </NavLink>
        {gridSystem === "row" && (
          <div className="hidden lg:[display:-webkit-box] lg:line-clamp-8 lg:text-ellipsis">
            {anime.description}
          </div>
        )}
        <div className="anime__card--details flex items-center justify-between mt-auto">
          <div className="anime__card--watches flex items-center text-sm">
            <span className="mr-0.5">
              <LuEye />
            </span>
            <span>{(anime.popularity / 1000).toFixed(1)}k</span>
          </div>
          <div className="anime__card--status">
            {anime.status === "RELEASING" && (
              <span className="text-yellow-600">Release</span>
            )}
            {anime.status === "FINISHED" && (
              <span className="text-green-500">Finished</span>
            )}
            {anime.status === "NOT_YET_RELEASED" && (
              <span className="text-red-500">Ongoing</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
