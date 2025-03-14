import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ISchedule } from "../../models/Schedule";
import ScheduleItem from "../../shared/Schedule.item/Schedule.item";
import { useState } from "react";
import Skeleton from "../../shared/Skeleton/Skeleton";

const ScheduleList = ({ schedules }: { schedules: ISchedule[] }) => {
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const today = new Date();

  // Определяем начало недели (понедельник)
  const startOfWeek = new Date(today);
  const dayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
  startOfWeek.setDate(today.getDate() + dayOffset);

  // Получаем воскресенье (прибавляем 6 дней к понедельнику)
  const monday = new Date(startOfWeek);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Формируем список дней недели с датами
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + index);
    return {
      day: daysOfWeek[index], // День недели
      date: currentDate.getDate(), // Число месяца
      startOfDay: new Date(currentDate.setHours(0, 0, 0, 0)), // Начало дня
      endOfDay: new Date(currentDate.setHours(23, 59, 59, 999)), // Конец дня
    };
  });

  const [indexTab, setIndexTab] = useState<number>(
    today.getDay() === 0 ? 0 : today.getDay() - 1
  );

  // Фильтруем аниме для каждого дня недели
  const filteredAnime = schedules.filter((anime) => {
    const airingDate = new Date(anime.airingAt * 1000); // Конвертируем Unix timestamp в дату
    const currentDay = weekDays[indexTab]; // Получаем текущий день
    return (
      airingDate >= currentDay.startOfDay && airingDate <= currentDay.endOfDay
    ); // Проверка попадания в текущий день
  });

  const prevTab = () => {
    if (indexTab > 0) setIndexTab(indexTab - 1);
    if (indexTab === 0) setIndexTab(6);
  };

  const nextTab = () => {
    if (indexTab < 6) setIndexTab(indexTab + 1);
    if (indexTab === 6) setIndexTab(0);
  };

  return (
    <div className="schedule--info__wrapper lg:w-[70%] w-full mx-auto bg-white shadow-2xl rounded p-5 py-2 my-10">
      <div className="schedule--info__header py-3 flex items-center justify-between">
        <div className="schedule--info__title">
          <h1 className="font-semibold text-lg lg:text-xl">Weekly schedule</h1>
        </div>
        <div className="schedule--options">
          <div className="shcedule--options__control flex items-center gap-3">
            <div
              onClick={prevTab}
              className="prev--day px-5 py-2 text-xl border rounded border-gray-300 cursor-pointer duration-300 hover:bg-gray-200"
            >
              <MdChevronLeft />
            </div>
            <div
              onClick={nextTab}
              className="next--day px-5 py-2 text-xl border rounded border-gray-300 cursor-pointer duration-300 hover:bg-gray-200"
            >
              <MdChevronRight />
            </div>
          </div>
        </div>
      </div>

      <div className="schedule--info__tabs mt-3">
        <TabGroup selectedIndex={indexTab} onChange={setIndexTab}>
          <TabList className="grid grid-cols-7">
            {weekDays.map((day, index) => {
              return (
                <Tab
                  key={index}
                  className={`schedule--info__tab rounded lg:ext-xl font-light py-2 px-3 flex flex-col items-center cursor-pointer duration-300 hover:bg-gray-200 ${
                    indexTab === index
                      ? "bg-black text-white font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <span>{day.day}</span>
                  <span>{day.date}</span>
                </Tab>
              );
            })}
          </TabList>

          <div className="schedule--info__body min-h-[250px] lg:min-h-[400px] mt-5">
            <TabPanels>
              {weekDays.map((_, index) => {
                return (
                  <TabPanel key={index} style={{ scrollBehavior: "unset" }}>
                    <div className="schedulte--info__tab-inner lg:grid lg:grid-cols-2">
                      {schedules.length > 0 ? (
                        filteredAnime
                          .filter(
                            (schedule, index, self) =>
                              index ===
                              self.findIndex(
                                (c) =>
                                  c.media.title.romaji ===
                                  schedule.media.title.romaji
                              )
                          )
                          .map((anime) => (
                            <ScheduleItem key={anime.id} schedule={anime} />
                          ))
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                  </TabPanel>
                );
              })}
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
};

export default ScheduleList;
