import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchedAnimes } from "../../utils/searchApi";
import { IAnime } from "../../models/Product";
import AnimesList from "../../components/AnimesList/AnimesList";

import { RiSearch2Line } from "react-icons/ri";
import Input from "../../shared/Input/Input";

const SearchPage = () => {
  const location = useLocation();
  window.scrollTo(0, 0);
  const queryParams = new URLSearchParams(location.search);
  const [animes, setAnimes] = useState<IAnime[]>([]);
  // Извлекаем параметр q из строки запроса
  const q = queryParams.get("q");
  const [value, setValue] = useState<string | null>(q);

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue("");
    window.history.pushState({}, "Search", `/search?q=${value}`);
  };

  useEffect(() => {
    const getSearchedData = async () => {
      if (value) {
        const data = await fetchSearchedAnimes({ search: value });
        setAnimes(data.data.Page.media);
      } else {
        console.log("No search query provided.");
      }
    };
    getSearchedData();
  }, [value]);

  return (
    <div className="search__page pb-20 lg:pb-10">
      <div className="search--from--mobile lg:hidden md:hidden">
        <form
          onSubmit={(e) => searchHandler(e)}
          className="search--form w-full py-2 px-1 relative"
        >
          <Input
            onChange={(e) => setValue(e.target.value)}
            withLabel={false}
            label=""
            type="text"
            className="py-1.5 flex-1 text-[#292526] text-sm bg-white"
            placeholder="Search..."
          />
          <button className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 py-2 text-[#292526]">
            <RiSearch2Line />
          </button>
        </form>
      </div>
      <AnimesList
        animes={animes.sort((a, b) => b.averageScore - a.averageScore)}
        setAnimes={setAnimes}
      />
    </div>
  );
};

export default SearchPage;
