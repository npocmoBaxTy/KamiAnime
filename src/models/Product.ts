export type IAnime = {
  id: number;
  averageScore: 87;
  bannerImage: string;
  characters: {
    edges: {
      node: {
        id: number;
        image: {
          large: string;
        };
        name: {
          full: string;
        };
      };
      role: string;
      voiceActors: {
        image: { large: string };
        languageV2: string;
        name: {
          full: string;
        };
      }[];
    }[];
  };
  coverImage: {
    large: string;
    extraLarge: string;
    medium: string;
  };
  description: string;
  duration: number;
  episodes: number;
  format: string;
  genres: string[];
  idMal: number;
  isAdult: boolean;
  meanScore: number;
  startDate: {
    day: number;
    month: number;
    year: number;
  };
  endDate: {
    day: number;
    month: number;
    year: number;
  };
  synonyms: string[];
  nextAiringEpisode: {
    episode: number;
    timeUntilAiring: number;
    airingAt: number;
  };
  popularity: number;
  recommendations: {
    edges: {
      node: {
        mediaRecommendation: {
          coverImage: {
            large: string;
          };
          id: number;
          siteUrl: string;
          title: {
            romaji: string;
            native: string;
            english: string;
          };
          meanScore: number;
          averageScore: number;
          popularity: number;
          status: string;
          episodes: number;
        };
      };
    }[];
  };
  relations: {
    edges: {
      node: {
        id: number;
        title: { romaji: string; english: string };
        coverImage: { large: string };
        type: string;
        format: string;
      };
      relationType: string;
    }[];
  };
  season: string;
  seasonYear: number;
  siteUrl: string;
  staff: {
    edges: {
      node: {
        image: { large: string };
        name: {
          full: string;
        };
        primaryOccupations: string[];
      };
    }[];
  };
  status: string;
  studios: {
    edges: {
      node: {
        name: string;
        isAnimationStudio: boolean;
      };
    }[];
  };
  tags: {
    name: string;
    rank: number;
    isGeneralSpoiler: boolean;
  }[];
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
};
