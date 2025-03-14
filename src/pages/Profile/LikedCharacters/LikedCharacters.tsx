import { ICharacter } from "../../../models/Character";
import CharacterItem from "../../../shared/Character-item/Character.item";

const LikedCharacters = ({ characters }: { characters: ICharacter[] }) => {
  return (
    <div className="user__liked-characters w-full">
      <div className="liked__characters--title">
        <h2 className="text-lg lg:text-2xl font-semibold text-primary">
          Favourite Characters
        </h2>
      </div>
      <div className="liked__characters--list grid lg:grid-cols-5 grid-cols-2 ">
        {characters.length === 0 ? (
          <div>No favourite characters</div>
        ) : (
          characters.map((character) => <CharacterItem character={character} />)
        )}
      </div>
    </div>
  );
};

export default LikedCharacters;
