import { useState, useEffect } from "react";
import AnimesList from "../../components/AnimesList/AnimesList";
import Pagination from "../../components/Pagination/Pagination";
import { IAnime } from "../../models/Product";
import { fetchAllAnimesData } from "../../utils/api";
import { useSearchParams } from "react-router-dom";
import Skeleton from "../../shared/Skeleton/Skeleton";

const Animes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [animes, setAnimes] = useState<IAnime[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page: number = Number(searchParams.get("page"));
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllAnimesData({ page: page });
        setSearchParams({ page: String(data.data.Page.pageInfo.currentPage) });
        setAnimes(data.data.Page.media);
        setTotal(data.data.Page.pageInfo.total);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching animes:", e);
        setLoading(false);
      }
    };
    getData();
  }, [searchParams]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setSearchParams({ page: String(selected + 1) });
    window.scrollTo({ behavior: "smooth", top: 0 });
  };
  return (
    <div className="all--animes__page-wrapper pb-20 min-h-[100vh]">
      <div className="animes__page--body px-2 pb-3 bg-gray rounded">
        {loading ? (
          <Skeleton />
        ) : (
          <AnimesList animes={animes} setAnimes={setAnimes} />
        )}
      </div>
      <div className="animes__page--footer flex justify-center lg:justify-end">
        <Pagination
          curPage={page}
          onPageChange={handlePageChange}
          totalPages={total / 50}
        />
      </div>
    </div>
  );
};

export default Animes;
