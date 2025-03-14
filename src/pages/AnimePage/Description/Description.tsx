import { IoMdTv } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IAnime } from "../../../models/Product";
import Relations from "../Relations/Relations";

const Description = ({ anime }: { anime: IAnime }) => {
  window.scrollTo(0, 0);
  return (
    <div className="anime__desc flex flex-col gap-3">
      <div className="anime__title px-1">
        <div className="flex items-start justify-between">
          <h1 className="text-xl lg:text-4xl orange-text font-semibold">
            {anime.title.english || anime.title.romaji}
          </h1>
          <span className="text-sm text-secondary">
            {anime.startDate.day}.{anime.startDate.month}.{anime.startDate.year}
          </span>
        </div>
        <span className="text-gray-200">{anime.title.native}</span>
        <div className="text-sm mt-2 flex items-center text-gray-300 gap-0.5">
          <span>EP:{anime.episodes}</span>
          <span>{anime.duration}m</span>
          <span className="inline-flex items-center ml-2 gap-1">
            <IoMdTv />
            {anime.format}
          </span>
        </div>
      </div>
      <div className="anime__genres mt-2 flex flex-wrap items-center gap-2">
        {anime.genres &&
          anime.genres.map((genre) => (
            <NavLink
              to={"/genres/genre/" + genre}
              key={`anime--genre-${genre}`}
              className="text-sm py-1 px-2 bg-gray-200 rounded"
            >
              #{genre}
            </NavLink>
          ))}
      </div>
      <div className="anime__studios mt-2 bg-gray rounded p-2">
        <h2 className="text-lg text-white mb-2">Studios</h2>
        <div className="anime__studios--list flex flex-wrap items-center gap-4">
          {anime.studios &&
            anime.studios.edges
              .filter(
                (studio, index, self) =>
                  index ===
                  self.findIndex((c) => c.node.name === studio.node.name)
              )
              .map((studio) => (
                <span
                  key={`anime--studio-${studio.node.name}`}
                  className="text-gray-200 text-sm inline-block py-1 px-2 orange-bg rounded"
                >
                  {studio.node.name}
                </span>
              ))}
        </div>
      </div>
      <div className="anime__desc w-full p-3 lg:p-4 rounded bg-gray my-2 text-primary">
        <h3 className="border-b mb pb-1 inline-block w-1/3 font-semibold text-lg">
          Description
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: anime.description }}
          className="mt-1 text-justify p-1"
        />
      </div>
      <Relations anime={anime} className="lg:hidden" />
    </div>
  );
};

export default Description;
