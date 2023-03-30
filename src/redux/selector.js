
export const getConfigSelector = (data) => data.getConfig
export const getGenresSelector = (data) => data.getGenres
export const getHomSelector = (data) => data.getHome
export const getHomeSliderSelector = (data) => data.getHome.slider

export const filtersSelector = (data) => data.filters.filtersValue
export const filtersConfig = (data) => data.filters.filtersConfig
export const searchFiltersSelector = (data) => data.filters.searchData.searchResults

export const multiSearchSelector = (data) => data.multiSearch.value
export const searchLeaderBoardSelector = (data) => data.searchLeaderBoard

export const movieDetailSelector = (data) => data.movieDetail
export const tvDetailSelector = (data) => data.tvDetail

export const getMovieSelector = (data) => data.getMovie
export const getTvSelector = (data) => data.getTv
export const getTrendingWeekSelector = (data) => data.getTrending.week
export const getTrendingDaySelector = (data) => data.getTrending.day