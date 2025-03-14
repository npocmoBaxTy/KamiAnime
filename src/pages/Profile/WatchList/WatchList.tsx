import { IAnime } from "../../../models/Product";
import Card from "../../../shared/Card/Card";

const WatchList = ({ animes }: { animes: IAnime[] }) => {
  return (
    <div className="profile__watchlist">
      <div className="watchlist--title">
        <h2 className="text-xl font-semibold text-primary">Watchlist</h2>
      </div>
      <div
        className={`watchlist--list grid ${
          animes.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"
        } grid-cols-2`}
      >
        {animes.length === 0 ? (
          <div>No watchlist animes</div>
        ) : (
          animes.map((anime) => <Card anime={anime} />)
        )}
      </div>
    </div>
  );
};

export default WatchList;
