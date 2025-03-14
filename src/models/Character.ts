import { IAnime } from "./Product";

export type ICharacter = {
  id: number;
  name: {
    full: string;
  };
  age: number;
  dateOfBirth: {
    year: number;
    month: number;
    day: number;
  };
  description: string;
  media: {
    edges: {
      node: IAnime;
    }[];
  };
  image: {
    large: string;
  };
};
