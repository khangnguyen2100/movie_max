import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex } from '@chakra-ui/react'
import { searchSelector } from '../../redux/selector'
import ListFilmLayout from '../../components/Layout/ListFilmLayout'
const Search = () => {
  const searchKeyWordsData = useSelector(searchSelector)
  return (
    <Flex justify={'space-between'} align>  
      <Box>
        <ListFilmLayout listFilm={searchKeyWordsData?.value?.searchKeyWords?.searchResults} />
      </Box>
      <Box>

      </Box>
    </Flex>
  )
}

export default Search