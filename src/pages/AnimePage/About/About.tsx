import { IoMdTv } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IAnime } from "../../../models/Product";
import Carousel from "../../../shared/Carousel/Carousel";
import AnimeImage from "../AnimeImage";
import Relations from "../Relations/Relations";
import { FC, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { HiInformationCircle } from "react-icons/hi2";

interface IAbout {
  anime: IAnime;
  setIndexTab: (index: number) => void;
}

const About: FC<IAbout> = ({ anime, setIndexTab }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="anime__about md:flex md:flex-col lg:flex lg:flex-row items-start gap-5">
      <div className="lg:w-[35%]">
        <AnimeImage setIndexTab={setIndexTab} anime={anime} />
        <Relations className="hidden md:hidden lg:block" anime={anime} />
      </div>
      <div className="anime__details--info relative lg:w-[70%]">
        <div className="anime__details--breadcrumbs hidden md:block px-2">
          <NavLink
            to={"/"}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Home
          </NavLink>
          <span className="mx-2 text-gray-400">/</span>
          <NavLink
            to={"/animes"}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Animes
          </NavLink>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-sm text-gray-400">
            {anime.title.english || anime.title.romaji}
          </span>
        </div>
        <div className="anime__title md:px-2">
          <div className="flex items-start justify-between">
            <h1 className="text-xl lg:text-4xl orange-text font-semibold">
              {anime.title.english || anime.title.romaji}
            </h1>
            <span className="text-sm text-secondary">
              {anime.startDate.day}.{anime.startDate.month}.
              {anime.startDate.year}
            </span>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center">
              <span className="text-gray-200">{anime.title.native}</span>
              <span
                className="text-secondary ml-3 lg:text-xl"
                data-tooltip-id="synonyms"
              >
                <HiInformationCircle />
              </span>
              <Tooltip
                opacity={1}
                id="synonyms"
                className="flex flex-col z-50 gap-1"
                place="bottom-end"
              >
                <h3 className="text-primary font-semibold text-xl">
                  Alternate titles
                </h3>
                {anime.synonyms.map((text) => (
                  <span key={text}>{text}</span>
                ))}
              </Tooltip>
            </div>
            <span className="bg-gray inline-block rounded text-xs lg:text-sm px-2 py-1 text-primary ml-auto">
              {anime.season}
            </span>
          </div>
          <div className="text-sm mt-2 flex items-center text-gray-300 gap-2">
            <span>EP:{anime.episodes}</span>
            <span>{anime.duration}m</span>
            <span className="inline-flex items-center ml-2 gap-1">
              <IoMdTv />
              {anime.format}
            </span>
          </div>
        </div>

        <div className="anime--characters__main w-full px-2 mt-5 bg-gray rounded">
          <div className="characters--title ">
            <h3 className="text-lg text-primary">Main characters</h3>
          </div>
          {/* Without slider for big screens */}
          <div className="flex items-stretch gap-3 flex-wrap">
            {anime.characters.edges
              .filter((character) => character.role === "MAIN")
              .map((character, index) => (
                <div
                  key={`without-slider--character--${index * Math.random()}-${
                    character.node.name.full
                  }`}
                  className="p-2 px-0"
                >
                  <img
                    src={character.node.image.large}
                    alt="character--image"
                    className="size-40 lg:size-52 rounded-t"
                  />
                  <div className="bg-gray w-full px-2 py-1">
                    <NavLink
                      to={`/characters/character/${character.node.id}`}
                      className="text-primary"
                    >
                      {character.node.name.full}
                    </NavLink>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="anime--character__sup mt-5 bg-gray rounded p-2">
          <div className="characters--title">
            <h3 className="text-lg text-primary">Supporting characters</h3>
          </div>
          <div className="hidden md:flex lg:flex items-center flex-wrap justify-between">
            {anime.characters.edges
              .filter((character) => character.role !== "MAIN")
              .filter(
                (character, index, self) =>
                  index ===
                  self.findIndex(
                    (c) => c.node.name.full === character.node.name.full
                  )
              )
              .map((character) => (
                <div
                  key={"div--" + character.node.name.full}
                  className="px-0 mb-2 flex flex-col justify-center items-center"
                >
                  <img
                    src={character.node.image.large}
                    alt="character--image"
                    className="size-40 lg:size-52 rounded-t"
                  />
                  <div className="black-bg px-2 py-1 w-40 lg:w-52">
                    <NavLink
                      to={`/characters/character/${character.node.id}`}
                      className="text-primary"
                    >
                      {character.node.name.full}
                    </NavLink>
                  </div>
                </div>
              ))}
          </div>
          {/* With slider for mobile */}
          <div className="block md:hidden lg:hidden">
            <Carousel slidesToScroll={1}>
              {anime.characters.edges
                .filter((character) => character.role !== "MAIN")
                .map((character) => (
                  <div
                    key={`slider--character--${character.node.name}`}
                    className="p-2 px-0 flex flex-col justify-center items-center"
                  >
                    <img
                      src={character.node.image.large}
                      alt="character--image"
                      className="size-40 lg:size-52 rounded-t"
                    />
                    <div className="black-bg px-2 py-1 w-40">
                      <NavLink
                        to={`/characters/character/${character.node.id}`}
                        className="text-primary"
                      >
                        {character.node.name.full}
                      </NavLink>
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
