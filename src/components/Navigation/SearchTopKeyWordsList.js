import React from 'react'
import { Box, OrderedList, ListItem, Text } from '@chakra-ui/react'
import HTMLReactParser from 'html-react-parser'
import { useSelector } from 'react-redux'

import { searchSelector } from '../../redux/selector'

const SearchTopKeyWordsList = ({handleClickSearchTopKeyWords}) => {
  const searchTopKeyWordsData = useSelector(searchSelector)
  
  return (
    <Box
      w='full' position='absolute' left='0' right='0'
      bg="bgColor" p='10px' pl='15px'
      zIndex='100' rounded='5px'
      boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'
    >
      <OrderedList fontSize='14px' fontWeight='light'>
      {
        searchTopKeyWordsData?.value?.searchTopKeyWords?.searchResults?.map((result,i) => {
          return (
            <ListItem 
              key={i} 
              _notLast={{marginBottom : '5px'}}
              onClick={() => handleClickSearchTopKeyWords(result)}
              _hover={{
                color : 'primaryColor'
              }}
            >
              <Text
                overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' w='full' cursor='pointer' 
              >
                {HTMLReactParser(result)}
              </Text>
            </ListItem>
          )
        })
      }
    </OrderedList>
    </Box>
)
}

export default SearchTopKeyWordsList