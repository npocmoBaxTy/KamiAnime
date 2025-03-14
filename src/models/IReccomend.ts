export type IReccommend = {
  node: {
    mediaReccommendation: {
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
};
