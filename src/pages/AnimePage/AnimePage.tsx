import { useEffect, useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { fetchAnimeById } from "../../utils/animeById";
import { IAnime } from "../../models/Product";
import Skeleton from "../../shared/Skeleton/Skeleton";
import "./AnimePage.css";
import { iReview } from "../../models/Review";
import { fetchReviewsById } from "../../utils/reviewsById";
import Reccomentdations from "../../components/Reccomendations/Reccomentdations";
import About from "./About/About";
import Description from "./Description/Description";
import Reviews from "./Reviews/Reviews";
import Trailer from "./Trailer/Trailer";
import { Tooltip } from "react-tooltip";

const AnimePage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState<IAnime>();
  const [reviews, setReviews] = useState<iReview[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  // Удаляем индекс вкладки при размонтировании компонента AnimePage, чтобы он не сохранялся между рендерами
  useEffect(() => {
    setTabIndex(0); // Сбрасываем при размонтировании
  }, [id]);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const getAnimeData = async () => {
      if (id) {
        const data = await fetchAnimeById({ id: Number(id) });
        setAnime(data.data.Page.media[0]);
      }
    };
    getAnimeData();

    const getReviewsData = async () => {
      if (id) {
        const data = await fetchReviewsById({ id: Number(id) });
        setReviews(data.data.Page.reviews);
      }
    };
    getReviewsData();
  }, [id]);
  return (
    <>
      {anime ? (
        <TabGroup
          selectedIndex={tabIndex}
          onChange={setTabIndex}
          className={"anime__page--tabs pb-20 pt-2 min-h-[100vh]"}
        >
          <TabList className="anime__page-tabs-list text-xs lg:text-sm flex z-50 sticky top-0 w-full justify-center mb-5 items-center gap-3 bg-gray rounded px-2">
            <Tab className={"anime__page-tab"}>About</Tab>
            <Tab className={"anime__page-tab"}>Description</Tab>
            <Tab className={"anime__page-tab"}>Reviews</Tab>
            <Tab className={"anime__page-tab"}>Trailer</Tab>
            {anime.nextAiringEpisode && (
              <div
                className={"anime__page-tab relative cursor-pointer"}
                data-tooltip-id="anime__page-tab-airing"
              >
                <span>Airing</span>
                <span className="bg-orange-500 size-2 rounded-full absolute top-2 right-0 animate-ping block"></span>
                <Tooltip
                  id="anime__page-tab-airing"
                  className="flex flex-col text-lg"
                  place="right"
                >
                  <span className="text-primary">
                    Next episode: {anime.nextAiringEpisode.episode}/
                    {anime.episodes}
                  </span>
                  <span>
                    {new Date(
                      anime.nextAiringEpisode.airingAt * 1000
                    ).toDateString()}
                  </span>
                  <span>
                    {new Date(
                      anime.nextAiringEpisode.airingAt * 1000
                    ).toLocaleTimeString()}
                  </span>
                </Tooltip>
              </div>
            )}
          </TabList>
          <TabPanels>
            <TabPanel className="about--tab-panel overflow-hidden">
              <div className="anime__details relative">
                <About
                  setIndexTab={(index) => handleTabChange(index)}
                  anime={anime}
                />
              </div>
            </TabPanel>
            <TabPanel className={"desc--tab-panel"}>
              <Description anime={anime} />
              <Reccomentdations anime={anime} />
            </TabPanel>
            <TabPanel className={"reviews--tab-panel"}>
              <Reviews reviews={reviews} />
            </TabPanel>
            <TabPanel className={"trailer--tab-panel"}>
              <Trailer anime={anime} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default AnimePage;
