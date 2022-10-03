import React, { useMemo } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Typography } from "../../components/common";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IMovie } from "../../interfaces/movie.interface";
import MainLayout from "../../layouts/MainLayout";
import MovieService from "../../services/movie.service";
import store from "../../store";
import { setMovies, setError, setIsLoading } from "../../store/slices/movieSlice";
import MovieItem from "./components/MovieItem";

interface IMovieMap {
  [genre: string]: IMovie[];
}

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: movies, error, isLoading } = useAppSelector((state) => state.movies);

  useEffect(() => {
    const loadMovies = () => {
      const search = store.getState().movies.search;
      if (!search) {
        dispatch(setIsLoading(true));
        MovieService.getMovies()
          .then((movies) => dispatch(setMovies(movies)))
          .catch((error) => dispatch(setError(error)))
          .finally(() => dispatch(setIsLoading(false)));
      }
    };
    loadMovies();
  }, [dispatch]);

  const movieMap: IMovieMap = useMemo(() => {
    return (movies || []).reduce((acc: IMovieMap, movie: IMovie) => {
      movie.genres.forEach((genre) => {
        if (acc[genre]) {
          acc[genre].push(movie);
          return;
        }
        acc[genre] = [movie];
      });
      return acc;
    }, {});
  }, [movies]);

  if (isLoading || !movies) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  if (Boolean(error)) {
    return (
      <MainLayout>
        <Typography variant="header" center>
          Server error occured
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {movies.length ? (
        <Container>
          {Object.keys(movieMap).map((genre) => (
            <GenreContainer key={genre}>
              <GenreHeader variant="body">{genre}</GenreHeader>
              <MoviesContainer>
                {movieMap[genre].map((movie) => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
              </MoviesContainer>
            </GenreContainer>
          ))}
        </Container>
      ) : (
        <Typography variant="header" center>
          Movies not found
        </Typography>
      )}
    </MainLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const GenreHeader = styled(Typography)`
  padding-left: 50px;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const MoviesContainer = styled.div`
  display: flex;
  column-gap: 30px;
  overflow: auto;
`;

export default HomePage;
