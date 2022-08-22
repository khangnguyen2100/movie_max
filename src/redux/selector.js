
export const getHomSelector = (data) => data.getHome
export const getSearchPlaceholder = (data) => data.getHome.value.searchKeyWord

export const filtersSelector = (data) => data.filters.filtersValue
export const filtersConfig = (data) => data.filters.filtersConfig
export const searchFiltersSelector = (data) => data.filters.searchData.searchResults

export const searchKeyWordsSelector = (data) => data.searchKeyWords.value.searchKeyWords.searchResults
export const searchTopKeyWordsSelector = (data) => data.searchKeyWords.value.searchTopKeyWords.searchResults
export const searchLeaderBoardSelector = (data) => data.searchLeaderBoard

export const movieDetailSelector = (data) => data.movieDetail
export const movieMediaSelector = (data) => data.movieMedia
