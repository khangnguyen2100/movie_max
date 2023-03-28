import { configureStore } from "@reduxjs/toolkit";

import {getConfigSlice, getHomeSlice, filtersSlice, multiSearchSlice, getMovieSlice, getTvSlice, searchLeaderBoardSlice, movieDetailSlice, movieMediaSlice, getGenresSlice} from "../services";
const store = configureStore({
  reducer : {
    getConfig : getConfigSlice.reducer,
    getGenres : getGenresSlice.reducer,
    getHome : getHomeSlice.reducer,
    filters : filtersSlice.reducer,
    multiSearch : multiSearchSlice.reducer,
    searchLeaderBoard : searchLeaderBoardSlice.reducer,
    movieDetail : movieDetailSlice.reducer,
    movieMedia : movieMediaSlice.reducer,
    getMovie : getMovieSlice.reducer,
    getTv : getTvSlice.reducer,
  }
})
export default store