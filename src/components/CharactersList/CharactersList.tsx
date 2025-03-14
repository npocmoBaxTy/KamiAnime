import { ICharacter } from "../../models/Character";
import CharacterItem from "../../shared/Character-item/Character.item";
import Skeleton from "../../shared/Skeleton/Skeleton";
import { FC, useState } from "react";
import ContentFilter from "../../shared/ContentFilter/ContentFilter";

interface ICharactersList {
  characters: ICharacter[];
  setCharacters: (characters: ICharacter[]) => void;
}

const CharactersList: FC<ICharactersList> = ({ characters, setCharacters }) => {
  const [gridSystem, setGridSystem] = useState(false);
  const [sortByName, setSortByName] = useState<string>("asc");

  const sortByNameHandler = () => {
    const sortedArr = [...characters];
    setSortByName((prev) => (prev === "asc" ? "desc" : "asc"));
    if (sortByName === "asc") {
      sortedArr.sort((a, b) => a.name.full.localeCompare(b.name.full));
      setCharacters(sortedArr);
    }
    if (sortByName === "desc") {
      sortedArr.sort((a, b) => b.name.full.localeCompare(a.name.full));
      setCharacters(sortedArr);
    }
  };
  return (
    <div className="characters__list--wrapper">
      <div className="characters__list--wrapper-inner">
        <ContentFilter
          sortByName={sortByNameHandler}
          sortByNameDirect={sortByName}
          setGridSystem={() => setGridSystem(false)}
          setRowSystem={() => setGridSystem(true)}
        />
        {characters.length === 0 ? (
          <Skeleton />
        ) : (
          <div
            className={`characters__list grid ${
              gridSystem
                ? "lg:grid-cols-2 grid-cols-1"
                : "lg:grid-cols-5 grid-cols-2"
            }`}
          >
            {characters.map((character) => (
              <CharacterItem
                character={character}
                grid={gridSystem}
                key={character.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharactersList;
