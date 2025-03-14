import { ICharacter } from "../../models/Character";
import Carousel from "../../shared/Carousel/Carousel";
import CharacterItem from "../../shared/Character-item/Character.item";
import { LuDot } from "react-icons/lu";
import Skeleton from "../../shared/Skeleton/Skeleton";
import { NavLink } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const PopularCharacters = ({ characters }: { characters: ICharacter[] }) => {
  return (
    <div className="characters__list--wrapper bg-gray p-2 rounded-md mt-10">
      <div className="characters__list--wrapper-inner">
        <div className="characters__list--title flex items-center mb-2 px-2">
          <h2 className="text-2xl font-bold orange-text">Characters</h2>
          <div className="flex items-center mt-1">
            <LuDot className="text-white" />
            <span className="text-gray-400 text-sm lg:text-[16px]">
              Most popular
            </span>
          </div>
          <div className="ml-auto orange-text flex items-center mt-1">
            <NavLink to={"/characters"}>More</NavLink>
            <MdOutlineArrowRightAlt />
          </div>
        </div>
        {characters.length === 0 ? (
          <Skeleton />
        ) : (
          <div className="characters__list">
            <Carousel slidesCount={5}>
              {characters.map((character) => (
                <CharacterItem character={character} key={character.id} />
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularCharacters;
