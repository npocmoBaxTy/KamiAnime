import { CiHeart } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import Carousel from "../../shared/Carousel/Carousel";
import { IAnime } from "../../models/Product";

const Reccomentdations = ({ anime }: { anime: IAnime }) => {
  return (
    <div className="anime__reccomendations bg-gray p-2">
      <div className="anime__recommendations--title text-primary text-lg mb-2">
        Recommendations
      </div>
      {anime.recommendations.edges.length > 5 ? (
        <Carousel slidesCount={5}>
          {anime.recommendations &&
            anime.recommendations.edges.map((anime) => (
              <NavLink
                to={`/animes/anime/${anime.node.mediaRecommendation.id}`}
                className={`anime__card rounded-md flex flex-col p-1`}
                key={anime.node.mediaRecommendation.id}
              >
                <div className="anime__card--img max-h-60 lg:max-h-[330px] relative overflow-hidden">
                  <LazyLoadImage
                    src={anime.node.mediaRecommendation.coverImage.large}
                    alt={anime.node.mediaRecommendation.title.english}
                    width={"100%"}
                    effect="blur"
                    className="h-60 w-full lg:h-[330px]"
                  />
                  {anime.node.mediaRecommendation.meanScore && (
                    <span className="inline-block absolute bg-green-500 text-white left-2 top-2 p-2 rounded-lg">
                      {anime.node.mediaRecommendation.meanScore}
                    </span>
                  )}
                  <span className="nline-block absolute border bg-white text-black right-2 top-2 p-2 rounded-lg">
                    <CiHeart />
                  </span>
                </div>
                <div className="anime__card--info h-28 flex flex-col justify-around p-2 text-sm lg:text-[16px] bg-[#17151b] text-gray-300">
                  <div className="anime__info--title ">
                    <span className="line-clamp-2 text-ellipsis orange-text lg:my-1">
                      {anime.node.mediaRecommendation.title.romaji}
                    </span>
                    <span>
                      Episodes:
                      {anime.node.mediaRecommendation.episodes
                        ? anime.node.mediaRecommendation.episodes
                        : 1}
                    </span>
                  </div>
                  <div className="anime__card--details flex items-center justify-between">
                    <div className="anime__card--watches flex items-center">
                      <span className="mr-0.5">
                        <LuEye />
                      </span>
                      <span>
                        {(
                          anime.node.mediaRecommendation.popularity / 1000
                        ).toFixed(1)}
                        k
                      </span>
                    </div>
                    <div className="anime__card--status">
                      {anime.node.mediaRecommendation.status ===
                        "RELEASING" && (
                        <span className="text-yellow-600">Release</span>
                      )}
                      {anime.node.mediaRecommendation.status === "FINISHED" && (
                        <span className="text-green-500">Finished</span>
                      )}
                      {anime.node.mediaRecommendation.status ===
                        "NOT_YET_RELEASED" && (
                        <span className="text-red-500">Ongoing</span>
                      )}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
        </Carousel>
      ) : (
        <div className="grid lg:grid-cols-5 grid-cols-2">
          {anime.recommendations.edges.map((anime) => (
            <NavLink
              to={`/animes/anime/${anime.node.mediaRecommendation.id}`}
              className={`anime__card rounded-md flex flex-col p-1`}
              key={anime.node.mediaRecommendation.id}
            >
              <div className="anime__card--img max-h-60 lg:max-h-[330px] relative overflow-hidden">
                <LazyLoadImage
                  src={anime.node.mediaRecommendation.coverImage.large}
                  alt={anime.node.mediaRecommendation.title.english}
                  width={"100%"}
                  effect="blur"
                  className="h-60 w-full lg:h-[330px]"
                />
                {anime.node.mediaRecommendation.meanScore && (
                  <span className="inline-block absolute bg-green-500 text-white left-2 top-2 p-2 rounded-lg">
                    {anime.node.mediaRecommendation.meanScore}
                  </span>
                )}
                <span className="nline-block absolute border bg-white text-black right-2 top-2 p-2 rounded-lg">
                  <CiHeart />
                </span>
              </div>
              <div className="anime__card--info h-28 flex flex-col justify-around p-2 text-sm lg:text-[16px] bg-[#17151b] text-gray-300">
                <div className="anime__info--title ">
                  <span className="line-clamp-2 text-ellipsis orange-text lg:my-1">
                    {anime.node.mediaRecommendation.title.romaji}
                  </span>
                  <span>
                    Episodes:
                    {anime.node.mediaRecommendation.episodes
                      ? anime.node.mediaRecommendation.episodes
                      : 1}
                  </span>
                </div>
                <div className="anime__card--details flex items-center justify-between">
                  <div className="anime__card--watches flex items-center">
                    <span className="mr-0.5">
                      <LuEye />
                    </span>
                    <span>
                      {(
                        anime.node.mediaRecommendation.popularity / 1000
                      ).toFixed(1)}
                      k
                    </span>
                  </div>
                  <div className="anime__card--status">
                    {anime.node.mediaRecommendation.status === "RELEASING" && (
                      <span className="text-yellow-600">Release</span>
                    )}
                    {anime.node.mediaRecommendation.status === "FINISHED" && (
                      <span className="text-green-500">Finished</span>
                    )}
                    {anime.node.mediaRecommendation.status ===
                      "NOT_YET_RELEASED" && (
                      <span className="text-red-500">Ongoing</span>
                    )}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reccomentdations;
