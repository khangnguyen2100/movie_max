import React, { useState, useRef, memo, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Box, Input } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

import { getSearchPlaceholder } from "../../redux/selector";
import {searchTopKeyWords, searchKeyWords, } from "../../services/searchKeyWordsSlice";
import SearchTopKeyWordsList from './SearchTopKeyWordsList'

const NavInput = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const searchIcon = useRef(null);
  const searchPlaceholder = useSelector(getSearchPlaceholder);

  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    dispatch(
      searchTopKeyWords({
        path: "search/searchLenovo",
        params: {
          searchKeyWord: e.target.value,
          size: 10,
        },
      })
    );
  };

  const handleSearchWithKeyWord = (text = searchText) => {
    text = text.replaceAll("<em>", "");
    text = text.replaceAll("</em>", "");

    dispatch(
      searchKeyWords({
        path: "search/v1/searchWithKeyWord",
        params: {
          searchKeyWord: text || searchInput.current.placeholder,
          size: 18,
          sort: "",
          searchType: "",
        },
      })
    );

    searchInput.current.placeholder = text || searchInput.current.placeholder;
    setSearchText("");

    // navigate to search page
    searchIcon.current.click()
  };
  const handleClickListKeyWords = (text) => {
    setSearchText(text);
    handleSearchWithKeyWord(text);
  };
  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
      searchInput.current.blur();
    }
  };
  return (
    <Box
        w={{
          base: "55%",
          lg: "40%",
        }}
        position="relative"
        ml="auto"
        mr={{lg: "50px",}}
      >
        <Box position="relative" overflow="hidden">
          <Input
            variant="flushed"
            position="relative"
            focusBorderColor="primaryColor"
            placeholder={searchPlaceholder}
            _placeholder={{
              color: "decsColor",
            }}
            value={searchText}
            onChange={(e) => handleSearchTextChange(e)}
            ref={searchInput}
            fontSize={{
              base: "sm",
              md: "md",
            }}
            w="full" pr="40px" pl="5px"
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <Box
            position="absolute"
            right="15px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={500}
            fontSize="20px"
            color="textColor"
            cursor={"pointer"}
            onClick={() => handleSearchWithKeyWord()}
          >
            <Link 
              to='/search' 
              ref={searchIcon}
            >
              <Search2Icon />
            </Link>
          </Box>
        </Box>
        {
        searchText.length !== 0 &&
        <SearchTopKeyWordsList
            handleClickListKeyWords={handleClickListKeyWords}
          />
        }
      </Box>
  )
}

export default memo(NavInput)