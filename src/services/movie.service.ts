import Api from "../api";
import { ApiRoutes } from "../constants/routes";
import { IMovie } from "../interfaces/movie.interface";

interface IMovieSevice {
  getMovies(search?: string): Promise<IMovie[]>;
  getMovie(id: string): Promise<IMovie>;
}

const getMovies = async (search: string = ""): Promise<IMovie[]> => {
  const url = ApiRoutes.movie.getList(search);
  const { data } = await Api.get<{ movies: IMovie[] }>(url);
  return data.movies;
};

const getMovie = async (slug: string): Promise<IMovie> => {
  const { data } = await Api.get<IMovie>(ApiRoutes.movie.getBySlug(slug));
  return data;
};

const MovieService: IMovieSevice = {
  getMovies,
  getMovie,
};

export default MovieService;
