import axios from "axios";

export const fetchScheduleData = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // День недели (0 - воскресенье, 1 - понедельник, и так далее)

  // Рассчитываем разницу в днях от текущего дня до начала недели (понедельника)
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Если воскресенье (0), то разница 6 дней

  // Получаем начало недели (понедельник)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diffToMonday); // Отнимаем количество дней до понедельника
  startOfWeek.setHours(0, 0, 0, 0); // Устанавливаем начало дня (00:00)

  // Получаем конец недели (воскресенье)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Добавляем 6 дней для воскресенья
  endOfWeek.setHours(23, 59, 59, 999); // Устанавливаем конец дня (23:59:59)

  // Получаем Unix timestamp (в секундах)
  const startTimestamp = Math.floor(startOfWeek.getTime() / 1000);
  const endTimestamp = Math.floor(endOfWeek.getTime() / 1000);
  const query = `
    query AiringSchedule {
        Page {
            airingSchedules(airingAt_greater:${startTimestamp},airingAt_lesser:${endTimestamp},sort:TIME_DESC) {
                airingAt,
                episode,
                timeUntilAiring
                id,
                mediaId,
                media {
                format,
                nextAiringEpisode {
                airingAt,
                episode,
                timeUntilAiring
                  }
                    chapters,
                    title {
                    romaji
                    english
                    native
                  }
                    episodes,
                    isAdult
                    duration,
                    startDate {
                    day,
                    month,
                    year
                    }
                    endDate {
                    day
                    month
                    year
                    }
                    coverImage {
                    large,
                    extraLarge
                    medium
                    }
                }
            }
        }
    }`;

  const data = await axios.post("https://graphql.anilist.co", { query });
  return data.data;
};
