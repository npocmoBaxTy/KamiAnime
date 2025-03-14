import axios from "axios";

export const fetchCharacterById = async (id: number) => {
  const query = `
query {
    Page{
    characters(id:${id}) {
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
