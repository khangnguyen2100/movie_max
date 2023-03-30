import React from 'react'
import { useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'

import { multiSearchSelector } from 'src/redux/selector'
import ListFilmLayout from 'src/components/Layout/ListFilmLayout'
export const Search = () => {
  let data = useSelector(multiSearchSelector)
  const filter = data.filter((item) => item.media_type !== 'person')
  return (
    <Flex justify={'space-between'} align>  
      <ListFilmLayout listFilm={filter} />
    </Flex>
  )
}
