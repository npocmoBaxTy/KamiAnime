import axios from "axios";

export const fetchAnimeById = async ({ id }: { id: number }) => {
  const query = `
      query {
        Page {
          media(id:${id}) {
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
          chapters
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
              id
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
                id
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
          synonyms
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
                  meanScore
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
            airingAt
          }
          siteUrl
          }
        }
      }
    `;

  const res = await axios.post("https://graphql.anilist.co", { query });
  return res.data;
};
