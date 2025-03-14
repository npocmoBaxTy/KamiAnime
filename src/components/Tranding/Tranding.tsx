import { LuDot } from "react-icons/lu";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IAnime } from "../../models/Product";
import Card from "../../shared/Card/Card";
import Carousel from "../../shared/Carousel/Carousel";
import Skeleton from "../../shared/Skeleton/Skeleton";

const Tranding = ({ animes }: { animes: IAnime[] }) => {
  return (
    <div className="tranding--animes bg-gray py-5 px-2 rounded">
      <div className="characters__list--title flex items-center mb-2 px-2">
        <h2 className="text-2xl font-bold orange-text">Tranding</h2>
        <div className="flex items-center mt-1">
          <LuDot className="text-white" />
          <span className="text-gray-400 text-sm lg:text-[16px]">
            Most popular
          </span>
        </div>
        <div className="ml-auto orange-text flex items-center mt-1">
          <NavLink to={"/animes"}>More</NavLink>
          <MdOutlineArrowRightAlt />
        </div>
      </div>
      <div className="tranding--animes__list w-full">
        {animes.length > 0 ? (
          <Carousel slidesCount={5}>
            {animes.map((anime) => (
              <Card key={`trandin--animes__card--${anime.id}`} anime={anime} />
            ))}
          </Carousel>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default Tranding;
