import { FC, useEffect } from "react";
import Tranding from "../../components/Tranding/Tranding";
import { ICharacter } from "../../models/Character";
import { IAnime } from "../../models/Product";
import { ISchedule } from "../../models/Schedule";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import PopularCharacters from "../../components/PopularCharacters/PopularCharacters";

interface IHome {
  animes: IAnime[];
  characters: ICharacter[];
  schedules: ISchedule[];
}

const Home: FC<IHome> = ({ animes, characters, schedules }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home--page__wrapper pb-10">
      <Tranding animes={animes.slice(0, 10)} />
      <PopularCharacters characters={characters} />
      <ScheduleList schedules={schedules} />
    </div>
  );
};

export default Home;
