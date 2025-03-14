import { IAnime } from "../../models/Product";
import BannerItem from "../../shared/Banner-item/Banner.item";
import Carousel from "../../shared/Carousel/Carousel";

const Banner = ({ animes }: { animes: IAnime[] }) => {
  return (
    <div className="home--page__banner py-2 overflow-hidden ">
      <Carousel slidesCount={1} forMobile={false}>
        {animes
          .filter((anime) => anime.bannerImage && anime.title.english)
          .map((anime) => (
            <BannerItem key={`banner--item--${anime.id}`} anime={anime} />
          ))}
      </Carousel>
    </div>
  );
};

export default Banner;
