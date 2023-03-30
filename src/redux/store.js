import { configureStore } from "@reduxjs/toolkit";

import {
  getConfigSlice,
  getHomeSlice,
  filtersSlice,
  multiSearchSlice,
  getMovieSlice,
  getTvSlice,
  searchLeaderBoardSlice,
  movieDetailSlice,
  getGenresSlice,
  getTrendingSlice,
  tvDetailSlice,
} from "../services";
const store = configureStore({
  reducer: {
    getConfig: getConfigSlice.reducer,
    getGenres: getGenresSlice.reducer,
    getHome: getHomeSlice.reducer,
    filters: filtersSlice.reducer,
    multiSearch: multiSearchSlice.reducer,
    searchLeaderBoard: searchLeaderBoardSlice.reducer,
    movieDetail: movieDetailSlice.reducer,
    tvDetail: tvDetailSlice.reducer,
    getMovie: getMovieSlice.reducer,
    getTv: getTvSlice.reducer,
    getTrending: getTrendingSlice.reducer,
  }
})
export default store