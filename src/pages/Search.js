import React from 'react'
import { useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'

import { searchKeyWordsSelector } from '../redux/selector'
import ListFilmLayout from '../components/Layout/ListFilmLayout'
const Search = () => {
  const data = useSelector(searchKeyWordsSelector)
  return (
    <Flex justify={'space-between'} align>  
      <ListFilmLayout listFilm={data} />
    </Flex>
  )
}

export default Search