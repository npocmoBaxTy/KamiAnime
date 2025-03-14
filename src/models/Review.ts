export type iReview = {
  body: string;
  createdAt: string;
  id: number;
  mediaId: string;
  rating: number;
  user: {
    name: string;
    avatar: {
      large: string;
      medium: string;
    };
  };
};
