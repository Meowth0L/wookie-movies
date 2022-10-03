import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../constants/colors";
import Logo from "../assets/logo.png";
import SearchIcon from "../assets/icons/search.svg";
import { NAVBAR_HEIGHT } from "../constants/offsets";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationRoutes } from "../constants/routes";
import { IconButton, Input } from "../components/common";
import MovieService from "../services/movie.service";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setError, setIsLoading, setMovies, setSearch as reduxSetSearch } from "../store/slices/movieSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect } from "react";
import _debounce from "lodash/debounce";

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const reduxSearch = useAppSelector((state) => state.movies.search);
  const [search, setSearch] = useState(reduxSearch);
  const navigate = useNavigate();

  const onSearchClick = _debounce(() => {
    dispatch(setIsLoading(true));
    MovieService.getMovies(search)
      .then((movies) => dispatch(setMovies(movies)))
      .catch((error) => dispatch(setError(error)))
      .finally(() => dispatch(setIsLoading(false)));
  }, 300);

  useEffect(() => {
    return () => {
      dispatch(reduxSetSearch(search));
    };
  });

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = _debounce((event) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  }, 300);

  const isSearchAvailable = location.pathname === NavigationRoutes.HOME;
  return (
    <HeaderContainer>
      <StyledImage src={Logo} alt="Logo" onClick={() => navigate(NavigationRoutes.HOME)} />
      {isSearchAvailable && (
        <SearchContainer>
          <IconButton Icon={SearchIcon} onClick={onSearchClick} />
          <Input placeholder="Title, people, genre" onChange={setSearch} value={search} onKeyDown={handleKeyDown} />
        </SearchContainer>
      )}
    </HeaderContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;

const StyledImage = styled.img`
  height: 40px;
  cursor: pointer;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  height: ${NAVBAR_HEIGHT}px;
  padding: 16px 48px;
  background-color: ${Colors.BLACK};
  box-sizing: border-box;
  position: fixed;
  width: 100vw;
  top: 0;
`;

export default React.memo(Header);
