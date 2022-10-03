export interface IMovie {
  id: string;
  backdrop: string;
  cast: string[];
  classification: string;
  director: string | string[];
  genres: string[];
  imdb_rating: number;
  length: string;
  overview: string;
  poster: string;
  released_on: string;
  slug: string;
  title: string;
}
