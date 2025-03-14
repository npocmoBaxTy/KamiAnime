import { FC } from "react";
import ReactPaginate from "react-paginate";
import { MdNavigateNext } from "react-icons/md";

interface IPagination {
  totalPages: number;
  onPageChange: ({ selected }: { selected: number }) => void;
  curPage: number;
}

const Pagination: FC<IPagination> = ({ totalPages, onPageChange, curPage }) => {
  return (
    <div className="pagination__wrapper w-full relative overflow-hidden">
      <ReactPaginate
        className="text-white flex items-center lg:justify-end justify-between gap-3 py-5"
        nextLabel={
          <MdNavigateNext className="cursor-pointer duration-300 hover:text-orange-500" />
        }
        previousLabel={
          <MdNavigateNext className="rotate-180 cursor-pointer duration-300 hover:text-orange-500" />
        }
        pageLinkClassName="lg:p-2 cursor-pointer rounded-md duration-300 hover:text-orange-500"
        activeLinkClassName="bg-[#111] lg:px-4.5 orange-text"
        pageRangeDisplayed={5}
        breakLabel={"..."}
        onPageChange={onPageChange}
        pageCount={totalPages}
        forcePage={curPage - 1}
      />
    </div>
  );
};

export default Pagination;
