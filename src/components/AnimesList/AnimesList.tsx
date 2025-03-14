import { FC, useState } from "react";
import { IAnime } from "../../models/Product";
import Card from "../../shared/Card/Card";
import ContentFilter from "../../shared/ContentFilter/ContentFilter";

interface IContentFilter {
  animes: IAnime[];
  setAnimes: (animes: IAnime[]) => void;
}

const AnimesList: FC<IContentFilter> = ({ animes, setAnimes }) => {
  const [gridSystem, setGridSystem] = useState("column");
  const [sortByName, setSortByName] = useState<string>("asc");
  const [sortByDate, setSortByDate] = useState<string>("desc");

  const sortByNameHandler = () => {
    const sortedArr = [...animes];
    setSortByName((prev) => (prev === "asc" ? "desc" : "asc"));
    if (sortByName === "asc") {
      sortedArr.sort((a, b) => a.title.romaji.localeCompare(b.title.romaji));
      setAnimes(sortedArr);
    }
    if (sortByName === "desc") {
      sortedArr.sort((a, b) => b.title.romaji.localeCompare(a.title.romaji));
      setAnimes(sortedArr);
    }
  };

  const sortByDateHandler = () => {
    const sortedArr = [...animes];
    setSortByDate((prev) => (prev === "desc" ? "asc" : "desc"));

    if (sortByDate === "asc") {
      sortedArr.sort(
        (a, b) =>
          new Date(
            `${a.startDate.year}.${a.startDate.month}.${a.startDate.day}`
          ).getTime() -
          new Date(
            `${b.startDate.year}.${b.startDate.month}.${b.startDate.day}`
          ).getTime()
      );
      setAnimes(sortedArr);
    }
    if (sortByDate === "desc") {
      sortedArr.sort(
        (a, b) =>
          new Date(
            `${b.startDate.year}.${b.startDate.month}.${b.startDate.day}`
          ).getTime() -
          new Date(
            `${a.startDate.year}.${a.startDate.month}.${a.startDate.day}`
          ).getTime()
      );
      setAnimes(sortedArr);
    }
  };

  return (
    <div className="animes--list__wrapper w-full ">
      <div className="animes__page--header">
        <ContentFilter
          setGridSystem={() => setGridSystem("column")}
          setRowSystem={() => setGridSystem("row")}
          sortByName={sortByNameHandler}
          sortByNameDirect={sortByName}
          sortByDate={sortByDateHandler}
          sortByDateDirect={sortByDate}
        />
      </div>
      <div
        className={`animes-list__wrapper-inner grid ${
          gridSystem === "row" && "lg:grid-cols-2 md:grid-cols-3 grid-cols-1"
        } ${
          gridSystem === "column" && "lg:grid-cols-5 md:grid-cols-3 grid-cols-2"
        }`}
      >
        {animes.map((anime) => (
          <Card
            key={`anime__card-----${anime.id}`}
            anime={anime}
            gridSystem={gridSystem}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimesList;
