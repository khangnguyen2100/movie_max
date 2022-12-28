import { configureStore } from "@reduxjs/toolkit";

import {getConfigSlice, getHomeSlice, filtersSlice, searchKeyWordsSlice, searchLeaderBoardSlice, movieDetailSlice, movieMediaSlice, getGenresSlice} from "../services";
const store = configureStore({
  reducer : {
    getConfig : getConfigSlice.reducer,
    getGenres : getGenresSlice.reducer,
    getHome : getHomeSlice.reducer,
    filters : filtersSlice.reducer,
    searchKeyWords : searchKeyWordsSlice.reducer,
    searchLeaderBoard : searchLeaderBoardSlice.reducer,
    movieDetail : movieDetailSlice.reducer,
    movieMedia : movieMediaSlice.reducer
  }
})
export default store