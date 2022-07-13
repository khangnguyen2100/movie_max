import React from 'react'
import { useSelector } from 'react-redux'

import { searchSelector } from '../../redux/selector'
import ListFilmLayout from '../../components/Layout/ListFilmLayout'
const Search = () => {
  const searchKeyWordsData = useSelector(searchSelector)
  return (
    <ListFilmLayout listFilm={searchKeyWordsData?.value?.searchKeyWords?.searchResults} />
  )
}

export default Search