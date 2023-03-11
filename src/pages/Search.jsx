import React from 'react'
import { useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'

import { searchKeyWordsSelector } from 'src/redux/selector'
import ListFilmLayout from 'src/components/Layout/ListFilmLayout'
export const Search = () => {
  let data = useSelector(searchKeyWordsSelector)
  return (
    <Flex justify={'space-between'} align>  
      <ListFilmLayout listFilm={data} />
    </Flex>
  )
}
