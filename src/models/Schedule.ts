export type ISchedule = {
  airingAt: number;
  episode: number;
  id: number;
  mediaId: number;

  timeUntilAiring: number;
  media: {
    duration: number;
    episodes: number;
    startDate: {
      day: number;
      month: number;
      year: number;
    };
    nextAiringEpisode: {
      episode: number;
      timeUntilAiring: number;
      airingAt: number;
    };
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    endDate: {
      day: number;
      month: number;
      year: number;
    };
    coverImage: {
      large: string;
      extraLarge: string;
      medium: string;
    };
    isAdult: boolean;
    format: string;
  };
};
