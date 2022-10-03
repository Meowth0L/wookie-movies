import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces/movie.interface";

const initialState: { list: IMovie[]; search: string; error: any; isLoading: boolean } = {
  list: [],
  search: "",
  error: null,
  isLoading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.list = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setMovies, setSearch, setError, setIsLoading } = movieSlice.actions;

export default movieSlice.reducer;
