import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "../../components/common";
import ImagePreview from "../../components/ImagePreview";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IMovie } from "../../interfaces/movie.interface";
import MainLayout from "../../layouts/MainLayout";
import MovieService from "../../services/movie.service";
import FilledStarIcon from "../../assets/icons/filled-star.svg";
import UnfilledStarIcon from "../../assets/icons/unfilled-star.svg";
import Colors from "../../constants/colors";

const starRating = [1, 2, 3, 4, 5];

const MoviePage: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovie>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    if (params.slug) {
      MovieService.getMovie(params.slug)
        .then(setMovie)
        .catch(setError)
        .finally(() => setIsLoading(false));
    } else {
      navigate("/");
    }
  }, [params, navigate]);

  if (!movie || isLoading) {
    return <LoadingSpinner />;
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

  const movieYear = new Date(movie.released_on).getFullYear();
  const directors = Array.isArray(movie.director) ? movie.director.join(", ") : movie.director;
  const movieRating = Math.round(movie.imdb_rating / 2);

  return (
    <MainLayout>
      <Container>
        <ImagePreview source={movie.poster} width={340} height={485} />
        <DescriptionContainer>
          <HeaderContainer>
            <NameContainer>
              <Typography variant="header">{movie.title}</Typography>
              <StarsContainer>
                {starRating.map((starRate) => (
                  <img src={starRate > movieRating ? UnfilledStarIcon : FilledStarIcon} alt="Star" key={starRate} />
                ))}
              </StarsContainer>
            </NameContainer>
            <DetailsContainer>
              <Typography>{movieYear}</Typography>
              <Delimiter />
              <Typography>{movie.length}</Typography>
              <Delimiter />
              <Typography>{directors}</Typography>
            </DetailsContainer>
          </HeaderContainer>
          <Overview>
            <Typography>{movie.overview}</Typography>
          </Overview>
        </DescriptionContainer>
      </Container>
    </MainLayout>
  );
};

const Overview = styled.div`
  width: 610px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const Delimiter = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${Colors.WHITE};
`;

const DetailsContainer = styled.div`
  display: flex;
  column-gap: 12px;
`;

const StarsContainer = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

const NameContainer = styled.div`
  display: flex;
  column-gap: 26px;
  color: ${Colors.WHITE};
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const Container = styled.div`
  display: flex;
  column-gap: 48px;
`;

export default MoviePage;
