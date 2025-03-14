import { NavLink } from "react-router-dom";
import { IAnime } from "../../models/Product";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BannerItem = ({ anime }: { anime: IAnime }) => {
  return (
    <div className="home--page__banner-item rounded-md hidden lg:block overflow-hidden h-96">
      <div className="banner__item--img max-h-[295px]">
        <LazyLoadImage
          src={anime.bannerImage}
          alt="anime--banner--image"
          width={"100%"}
          effect="blur"
          className="block max-h-[295px] w-full object-cover z-40"
        />
      </div>
      <div className="banner__item--info bg-[#17151b] p-2 flex items-center justify-between">
        <div className="banner__item-title">
          <h2 className="p-2 text-2xl text-white">{anime.title.english}</h2>
          <span className="text-gray-300">{anime.episodes} Episodes</span>
        </div>
        <div className="banner__item-link">
          <NavLink
            to={`/animes/anime/${anime.id}`}
            className={"px-3 py-1 rounded bg-[#ff3d00] text-white"}
          >
            Watch now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
