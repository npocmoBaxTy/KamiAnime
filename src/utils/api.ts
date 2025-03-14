import axios from "axios";

type IParams = {
  page?: number;
  limit?: number;
};

export const fetchAllAnimesData = async ({
  limit = 5000,
  page = 1,
}: IParams) => {
  const query = `
      query {
        Page(page:${page},perPage:${limit}) {
        pageInfo {
          currentPage,
          hasNextPage,
          perPage
          total
        },
          media(type:ANIME,sort:TRENDING_DESC,startDate_lesser:1672531200) {
          id
          idMal
          startDate {
            day
            month
            year
          }
          endDate {
            day
            month
            year
          }
          title {
            romaji
            english
            native
          }
          description
          format
          status
          episodes
          duration
          season
          seasonYear
          genres
          tags {
            name
            rank
            isGeneralSpoiler
          }
          averageScore
          meanScore
          popularity
          isAdult
          coverImage {
            extraLarge
            large
            medium
          }
          bannerImage
          trailer {
            id
            site
            thumbnail
          }
          studios {
            edges {
              node {
                name
                isAnimationStudio
              }
            }
          }
          staff {
            edges {
              node {
                name {
                  full
                }
                image {
                  large
                }
                primaryOccupations
              }
            }
          }
          characters {
            edges {
              node {
                name {
                  full
                }
                image {
                  large
                }
              }
              role
              voiceActors {
                name {
                  full
                }
                languageV2
                image {
                  large
                }
              }
            }
          }
          relations {
            edges {
              node {
                id
                coverImage {
                  large
                  extraLarge
                }
                title {
                  romaji
                  english
                }
                format
                type
              }
              relationType
            }
          }
          recommendations {
            edges {
              node {
                mediaRecommendation {
                  id
                  title {
                    romaji
                    english
                  }
                  coverImage {
                    large
                  }
                  averageScore
                  episodes
                  popularity  
                  siteUrl
                  status
                }
              }
            }
          }
          nextAiringEpisode {
            episode
            timeUntilAiring
          }
          siteUrl
          }
        }
      }
    `;
  const res = await axios.post("https://graphql.anilist.co", { query });
  return res.data;
};
