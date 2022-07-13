import React, {useState, useRef, } from 'react'
import { Input, HStack,Box,Flex,Button,Menu,MenuButton,MenuList,MenuItem,MenuDivider,Stack} from '@chakra-ui/react';
import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SearchTopKeyWordsList from './SearchTopKeyWordsList';
import { searchTopKeyWords, searchKeyWords } from '../../services/searchKeyWordsSlice';
const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useRef(null)
  
  const [searchText, setSearchText] = useState('');
  const [openSearchBar, setOpenSearchBar] = useState()

  let searchOpenStyle = ''
  openSearchBar ? searchOpenStyle = "translateX(0)" : searchOpenStyle = "translateX(210%)"

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
    dispatch(searchTopKeyWords({
      path : 'search/searchLenovo',
      params : {
        "searchKeyWord": searchText,
        "size": 10
      }
    }))
  }

  const handleClickSearchBtn = (text = searchText) => {
    if(text !== '') {
      dispatch(searchKeyWords({
        path : 'search/v1/searchWithKeyWord',
        params : {
          "searchKeyWord": searchText,
          "size": 18,
          "sort": "",
          "searchType": ""
        }
      }))
  
      if(text) {
        text = text.replace('<em>','')
        text = text.replace('</em>','')
        searchInput.current.placeholder = text
      }
      setSearchText('')
      navigate('/search')
    } else {
      setOpenSearchBar(!openSearchBar)
    }
  }
  const handleClickSearchTopKeyWords = (text) => {
    setSearchText(text)
    handleClickSearchBtn(text)
  }
  const handleClickEnter = (e) => {
    if(e.key === "Enter") {
      handleClickSearchBtn()
      searchInput.current.blur()
    }
  }
  return (
    <Flex h={'55px'} alignItems={'center'} justifyContent={'space-between'}>
      <Box fontWeight='extrabold' color="primaryColor" fontSize="lg">
        <Link to='/'>
          MovieMax
        </Link>
      </Box>

      <Box
        w={{
            base : '55%',
            lg : '40%'
        }}
        position='relative'  ml='auto' mr={{
          lg : '50px'
        }}
      >
        <Box position='relative' overflow='hidden'>
          <Input 
            variant='flushed' 
            position='relative'
            focusBorderColor='primaryColor'
            placeholder='Title, People, Genres'
            _placeholder={{
              color : 'decsColor'
            }}
            value={searchText}
            onChange={((e) => handleSearchTextChange(e))}
            ref={searchInput}
            fontSize={{
              base : 'sm',
              md : 'md'
            }}
            w='full'
            pr='40px'
            pl='5px'
            onKeyDown={(e) => handleClickEnter(e)}

            transform={{
              base : searchOpenStyle,
              md : 'translateX(0)'
            }}
          />
          <Search2Icon 
            position='absolute' right='15px' top='50%' transform='translateY(-50%)' zIndex={50000000} fontSize="20px"
            onClick={() => handleClickSearchBtn()}
            color="textColor"
          />
        </Box>
        {
          searchText !== "" && (
            <SearchTopKeyWordsList handleClickSearchTopKeyWords={handleClickSearchTopKeyWords} />
          )
        }
      </Box>

      <Flex alignItems={'center'}>
        <Stack direction={'row'} spacing={7}>
          {/* Navigation desktop */}
          <HStack 
              spacing='30px'
              display={{ base: 'none', lg: 'flex' }}
            >
              <Box color='textColor' _hover={{color:'primaryColor'}}>
                <Link to='/'>Home</Link>
              </Box>
              <Box  color='textColor' _hover={{color:'primaryColor'}}>
                <Link to='/all'>Find your movie</Link>
              </Box>
          </HStack>

          {/* Navigation mobile */}
          <Menu zIndex={100}>
            <MenuButton
              as={Button}
              rounded='full'
              variant='link'
              cursor='pointer'
              minW={0}
              color='textColor'
              _active={{
                color : 'primaryColor'
              }}
              display={{lg:'none'}}
              >
              <HamburgerIcon fontSize='2xl'/>
            </MenuButton>

            <MenuList zIndex={100} alignItems={'center'} bg="bgColor" border='0'  boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' >
              <MenuItem textTransform='capitalize'  _hover={{color : 'primaryColor'}} _active={{backgroundColor : 'transparent'}} _focus={{backgroundColor : 'transparent'}}>
                <Link to='/'>Home</Link>
              </MenuItem>
              <MenuDivider  borderColor='dividerColor' />
              <MenuItem textTransform='capitalize'  _hover={{color : 'primaryColor'}} _active={{backgroundColor : 'transparent'}} _focus={{backgroundColor : 'transparent'}}>
                <Link to='/all'>Find your movie</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Navigation