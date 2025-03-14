import axios from "axios";

export const fetchCharactersById = async (characters: number[]) => {
  const query = `
query {
    Page{
    characters(id_in:[${characters}]) {
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

  const res = await axios.post("https://graphql.anilist.co", { query });
  return res.data;
};
