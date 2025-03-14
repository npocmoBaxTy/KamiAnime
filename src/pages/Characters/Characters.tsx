import { useEffect, useState } from "react";
import CharactersList from "../../components/CharactersList/CharactersList";
import { ICharacter } from "../../models/Character";
import { fetchCharactersData } from "../../utils/charactersApi";
import Skeleton from "../../shared/Skeleton/Skeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const Characters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page: number = Number(searchParams.get("page"));
  const [loading, setLoading] = useState<boolean>(true);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setSearchParams({ page: String(selected + 1) });
    window.scrollTo({ behavior: "smooth", top: 0 });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await fetchCharactersData({ page: page, perPage: 50 });

        setCharacters(data.data.data.Page.characters);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);
  return (
    <div className="characters__page--wrapper min-h-[100vh]">
      {loading ? (
        <Skeleton />
      ) : (
        <div className="characters__page--wrapper-inner">
          <CharactersList
            characters={characters}
            setCharacters={setCharacters}
          />
          <div className="characters__page--pagination">
            <Pagination
              curPage={page}
              onPageChange={handlePageChange}
              totalPages={100}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
