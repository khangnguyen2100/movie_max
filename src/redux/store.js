import { configureStore } from "@reduxjs/toolkit";

import getHomeSlice from "../services/getHomeSlice";
import filtersSlice from "../services/filtersSlice";
import searchKeyWordsSlice from "../services/searchKeyWordsSlice";

import movieDetailSlice from "../services/movieDetailSlice";
import movieMediaSlice from "../services/movieMediaSlice";
const store = configureStore({
  reducer : {
    getHome : getHomeSlice.reducer,
    filters : filtersSlice.reducer,
    searchKeyWords : searchKeyWordsSlice.reducer,
    movieDetail : movieDetailSlice.reducer,
    movieMedia : movieMediaSlice.reducer
  }
})
export default store