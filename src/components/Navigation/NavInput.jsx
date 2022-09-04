import React, { useState, useRef, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import {
  searchTopKeyWords,
  searchKeyWords,
} from "../../services/searchKeyWordsSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";

const NavInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchInput = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [isShow, setIsShow] = useState(false);
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
  useEffect(() => {
    setIsShow(document.activeElement.tagName === "INPUT")
  }, [document.activeElement.tagName])
  
  
  const handleSearchWithKeyWord = (text = searchText) => {
    text = text.replaceAll("<em>", "");
    text = text.replaceAll("</em>", "");

    dispatch(
      searchKeyWords({
        path: "search/v1/searchWithKeyWord",
        params: {
          searchKeyWord: text,
          size: 18,
          sort: "",
          searchType: "",
        },
      })
    );
    
    // navigate to search page
    setSearchText(text);
    navigate('/search')
    searchInput.current.blur();
    setIsShow(false)
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
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
      mr={{ lg: "50px" }}
    >
      <Box position="relative" overflow="hidden">
        <Input
          variant="flushed"
          position="relative"
          focusBorderColor="primaryColor"
          placeholder="Search by name"
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
          w="full"
          pr="40px"
          pl="5px"
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
          <Link to="/search">
            <Search2Icon />
          </Link>
        </Box>
      </Box>
      {isShow && (
        <SearchTopKeyWordsList
          handleClickListKeyWords={handleSearchWithKeyWord}
        />
      )}
    </Box>
  );
};

export default memo(NavInput);
