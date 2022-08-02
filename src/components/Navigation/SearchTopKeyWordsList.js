import React from "react";
import {
  Box,
  OrderedList,
  ListItem,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";
import HTMLReactParser from "html-react-parser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchSelector } from "../../redux/selector";
import { searchLeaderBoardSelector } from "../../redux/selector";

const SearchTopKeyWordsList = ({ handleClickSearchTopKeyWords, searchText, handleFilmClick }) => {
  const searchTopKeyWordsData = useSelector(searchSelector);
  let check = searchText === ''
  const searchLeaderBoard = useSelector(searchLeaderBoardSelector);
  
  return (
    <Box
      w="full"
      position="absolute"
      left="0"
      right="0"
      bg="bgColor"
      p="10px"
      pl="20px"
      zIndex="100"
      rounded="5px"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
    >
      <OrderedList fontSize="14px" fontWeight="light">

        <Box ml={"-20px"} mb="10px">
          <Heading
            fontSize={"17px"}
            fontWeight="500"
            w="full"
            textTransform={"capitalize"}
            color="primaryColor"
            mb="5px"
          >
            {
              check ?
            'people are also searching' :
            " Top Search"
            }
          </Heading>
          <Divider />
        </Box>

        {check &&
          searchLeaderBoard?.value?.list?.map((item, i) => {
            return (
              <Box 
                key={i}
              >
                <ListItem
                  _notLast={{ marginBottom: "10px" }}
                  _hover={{
                    color: "primaryColor",
                  }}
                  onClick={() => handleFilmClick(item.domainType, item.id, item.title)}
                >
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    w="full"
                    fontSize={"16px"}
                    cursor="pointer"
                  >
                    {item.title}
                  </Text>
                </ListItem>
              </Box>
            );
        })}

        {searchTopKeyWordsData?.value?.searchTopKeyWords?.searchResults?.map((result, i) => {
          return (
            <ListItem
              key={i}
              _notLast={{ marginBottom: "5px" }}
              onClick={() => handleClickSearchTopKeyWords(result)}
              _hover={{
                color: "primaryColor",
              }}
            >
              <Text
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                w="full"
                cursor="pointer"
              >
                {HTMLReactParser(result)}
              </Text>
            </ListItem>
          );
        })}

        {
          (searchTopKeyWordsData?.value?.searchTopKeyWords?.searchResults?.length === 0 && !check) &&
            <Text
              ml='-10px'
            >
              No result, please try something else.
            </Text>
        }
      </OrderedList>
    </Box>
  );
};

export default SearchTopKeyWordsList;
