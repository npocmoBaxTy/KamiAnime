import { IAnime } from "../../../models/Product";
import Card from "../../../shared/Card/Card";

const LikedAnimes = ({ animes }: { animes: IAnime[] }) => {
  return (
    <div className="user__liked--animes">
      <div className="liked__animes--title">
        <h2 className="text-xl font-semibold text-primary">Favourite Animes</h2>
      </div>
      <div className="liked__animes--list grid lg:grid-cols-5 grid-cols-2">
        {animes.length === 0 ? (
          <div>No favourite characters</div>
        ) : (
          animes.map((anime) => <Card anime={anime} />)
        )}
      </div>
    </div>
  );
};

export default LikedAnimes;
