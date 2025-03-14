import axios from "axios";

type ISearchParams = {
  search: string;
  page?: number;
};

export const fetchSearchedAnimes = async ({ search, page }: ISearchParams) => {
  const query = `
    query {
      Page(page:${page || 1}) {
        pageInfo {
            currentPage,
            hasNextPage,
            perPage
            total
        },
        media(search:"${search}",isAdult:false,type:ANIME) {
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
                siteUrl
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
