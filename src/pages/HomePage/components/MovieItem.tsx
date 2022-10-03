import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../../../components/ImagePreview";
import { IMovie } from "../../../interfaces/movie.interface";

interface IMovieItemProps {
  movie: IMovie;
}

const MovieItem: React.FC<IMovieItemProps> = (props: IMovieItemProps) => {
  const { movie } = props;
  const navigate = useNavigate();
  const navigateToMovieDetails = useCallback(() => {
    navigate(`/movies/${movie.slug}`);
  }, [movie, navigate]);
  return <ImagePreview source={movie.backdrop} onClick={navigateToMovieDetails} />;
};

export default MovieItem;
