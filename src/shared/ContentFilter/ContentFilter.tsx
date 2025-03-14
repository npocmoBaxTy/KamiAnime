import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FC } from "react";

interface IContentFilter {
  setRowSystem?: () => void;
  setGridSystem?: () => void;
  sortByName?: () => void;
  sortByDate?: () => void;
  sortByNameDirect?: string;
  sortByDateDirect?: string;
}

const ContentFilter: FC<IContentFilter> = ({
  setGridSystem,
  setRowSystem,
  sortByName,
  sortByDate,
  sortByDateDirect,
  sortByNameDirect,
}) => {
  return (
    <div className="content__filter--wrapper p-3 lg:p-5 lg:px-1">
      <div className="content__filter--wrapper-inner text-white text-lg flex items-center">
        <div className="content__filter--sort flex items-center gap-2">
          <div
            className="sort-by-name px-2 py-1 orange-bg rounded"
            onClick={sortByName}
          >
            <span>
              {sortByNameDirect === "asc" ? (
                <BsSortAlphaDown />
              ) : (
                <BsSortAlphaUp />
              )}
            </span>
          </div>
          <div
            className="sort-by-date px-2 py-1 orange-bg rounded"
            onClick={sortByDate}
          >
            <span>
              {sortByDateDirect === "asc" ? <GoSortAsc /> : <GoSortDesc />}
            </span>
          </div>
        </div>
        <div className="content__filter--grid ml-auto flex items-center gap-2">
          <div className="rows cursor-pointer" onClick={setRowSystem}>
            <CiGrid41 />
          </div>
          <div className="cols cursor-pointer" onClick={setGridSystem}>
            <BsGrid3X3GapFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentFilter;
