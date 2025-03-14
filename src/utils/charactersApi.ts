import axios from "axios";

interface IData {
  page?: number;
  perPage?: number;
}

export const fetchCharactersData = async ({
  page = 1,
  perPage = 50,
}: IData) => {
  const query = `
query {
    Page(page:${page},perPage:${perPage}){
    pageInfo {
          currentPage,
          hasNextPage,
          perPage
          total
        },
    characters(sort:FAVOURITES_DESC) {
        id,
        age,
        dateOfBirth {
          day
          month
          year
        }
        description
        name{
            full
        }
        image {
          large
        }        
        media {
            edges {
              node {
                id
                title {
                  romaji
                  english
                  native
                }
                  
                format
                episodes
                duration
                season
                seasonYear
                nextAiringEpisode {
                    episode
                    timeUntilAiring
                }
                type
                coverImage {
                  large
                  extraLarge
                }
              }
              relationType
            }
          }
    }}
}
`;
  const data = await axios.post("https://graphql.anilist.co", { query });
  return data;
};
