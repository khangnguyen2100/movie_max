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
import { searchTopKeyWordsSelector } from "../../redux/selector";
const SearchTopKeyWordsList = ({ handleClickListKeyWords }) => {
  const data = useSelector(searchTopKeyWordsSelector);
  if(data !== undefined) {
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
              Top Search
            </Heading>
            <Divider />
          </Box>
          {data?.map((result, i) => {
            return (
              <ListItem
                key={i}
                _notLast={{ marginBottom: "5px" }}
                onClick={() => handleClickListKeyWords(result)}
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
            data?.length === 0 &&
            <Text
              ml='-10px'
            >
              No result, please try something else.
            </Text>
          }
        </OrderedList>
      </Box>
    );
  }
};

export default SearchTopKeyWordsList;
