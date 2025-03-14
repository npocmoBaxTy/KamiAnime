import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../../utils/getCharacterById";
import { ICharacter } from "../../models/Character";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CharacterAnimes from "./Character.Animes";
import CharacterMangas from "./Character.Mangas";

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<ICharacter>();
  useEffect(() => {
    const getCharacterData = async () => {
      const data = await fetchCharacterById(Number(id));
      setCharacter(data.data.Page.characters[0]);
    };
    getCharacterData();
  }, [id]);
  return (
    <div className="character__page lg:flex lg:flex-wrap pb-20">
      <div className="character__img lg:w-1/4 p-2 lg:p-0">
        <LazyLoadImage
          className="w-full rounded-md h-[350px] lg:h-auto"
          src={character?.image.large}
        />
      </div>
      <div className="character__info lg:p-2 lg:w-[70%]">
        <h1 className="text-2xl lg:text-6xl text-primary orange-text">
          {character?.name.full}
        </h1>
        <p className="text-justify text-primary mt-2 p-1">
          {character?.description}
        </p>
        <div className="character__animes bg-gray w-full mt-5 rounded">
          <h2 className="text-xl py-2 pl-1 text-primary font-semibold uppercase">
            Animes & Movies
          </h2>
          {character?.media.edges && <CharacterAnimes character={character} />}
        </div>
        <div className="character__animes bg-gray w-full mt-5 p-2 rounded">
          <h2 className="text-xl text-primary font-semibold uppercase py-2 pl-1">
            Mangas & Novels
          </h2>
          {character?.media.edges && <CharacterMangas character={character} />}
        </div>
      </div>
    </div>
  );
};

export default Character;
