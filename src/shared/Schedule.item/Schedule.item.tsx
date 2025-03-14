import { useRef } from "react";
import { ISchedule } from "../../models/Schedule";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NavLink } from "react-router-dom";

const ScheduleItem = ({ schedule }: { schedule: ISchedule }) => {
  const imageRef = useRef<any>(null);

  const handleOnLoad = () => {
    // Прокручиваем страницу до изображения
    if (imageRef.current) {
      imageRef.current.scrollIntoView({
        behavior: "smooth", // Плавная прокрутка
        block: "start", // Прокручивать в верхнюю часть экрана
      });
    }
  };
  const correctDate = new Date(
    new Date(schedule.media.nextAiringEpisode.airingAt * 1000)
  );
  return (
    <div className="schedule--info__item w-full border-b mb-2 border-gray-300">
      <div className="schedule--info__item-inner flex items-stretch">
        <div className="schedule--infot__item-img mr-2 min-w-30 lg:min-w-36 overflow-hidden relative">
          <LazyLoadImage
            src={schedule.media.coverImage.extraLarge}
            alt="anime--schedule--image"
            className="h-40 w-30 lg:w-36 rounded"
            effect="blur"
            onLoad={handleOnLoad}
          />
        </div>
        <div className="schedule--infot__item-info flex flex-col">
          <NavLink
            to={`/animes/anime/${schedule.mediaId}`}
            className="schedulte__item-title line-clamp-2 text-ellipsis underline"
          >
            {schedule.media.title.romaji}
          </NavLink>
          <div className="schedule__item-episode">
            Episodes{" "}
            <span>{`${schedule.media.nextAiringEpisode.episode}/${
              schedule.media.episodes ? schedule.media.episodes : "Unknown"
            }`}</span>
          </div>
          <div className="schedule__item-format">{schedule.media.format}</div>
          <div className="next--airing--episode flex items-center">
            <div className="next--airing__title">Next Episode:</div>
            <div className="next--airing__info">
              {schedule.media.nextAiringEpisode.episode}
            </div>
          </div>
          <div className="next--airing--date flex items-center">
            <div className="next--airing__title">Next Airing:</div>
            <div className="next--airing__info">
              {correctDate.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
