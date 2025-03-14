import { NavLink } from "react-router-dom";
import { ICharacter } from "../../models/Character";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FC } from "react";
import styles from "./Character.item.module.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../Providers/AuthContext/AuthContext";
import useLikeCharacter from "../../hooks/useLikeCharacter";
interface ICharacterItem {
  character: ICharacter;
  grid?: boolean;
}

const CharacterItem: FC<ICharacterItem> = ({ character, grid }) => {
  const { user } = useAuth();
  const { addCharacterLike } = useLikeCharacter();
  return (
    <div
      className={`${
        !grid
          ? `${styles["character__card"]}`
          : `${styles["character__card--nogrid"]} grid grid-cols-2`
      } p-1 overflow-hidden relative`}
    >
      <div
        className={`${styles["character--image"]} max-h-64 lg:max-h-[300px] overflow-hidden relative`}
      >
        <LazyLoadImage
          src={character.image.large ? character.image.large : ""}
          alt={character.name.full}
          effect="blur"
          width={"100%"}
          className="h-56 lg:h-[300px] w-full block rounded-t-md"
        />
        <span
          onClick={() => addCharacterLike(character.id)}
          className="inline-block absolute border bg-white text-black right-2 top-2 p-2 rounded-lg cursor-pointer"
        >
          {user?.characters?.includes(character.id) ? (
            <FaHeart fill="red" />
          ) : (
            <CiHeart />
          )}
        </span>
      </div>
      <NavLink
        to={"/characters/character/" + character.id}
        className="block character--info bg-[#17151b] p-2"
      >
        <h2 className="text-gray-400 w-full orange-text line-clamp-1 text-ellipsis">
          {character.name.full}
        </h2>
        <span className="text-gray-400">{`${character.dateOfBirth.day}.${character.dateOfBirth.month}.${character.dateOfBirth.year}`}</span>
        {grid && (
          <p className="line-clamp-5 text-white mt-3">
            {character.description}
          </p>
        )}
      </NavLink>
    </div>
  );
};

export default CharacterItem;
