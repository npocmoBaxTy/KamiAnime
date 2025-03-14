import axios from "axios";

export const fetchReviewsById = async ({ id }: { id: number }) => {
  const query = `
    query {
        Page {
            reviews(mediaId:${id}) {
                id
                    createdAt
                    user {
                        name
                        avatar {
                            large
                            medium
                        }
                    }
                    body
                    rating
            }
        }
    }
 `;
  const response = await axios.post("https://graphql.anilist.co", { query });
  return response.data;
};
