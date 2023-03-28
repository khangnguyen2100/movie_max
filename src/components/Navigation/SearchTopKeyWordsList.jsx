import {
  Box, Divider, Heading, ListItem, OrderedList, Text
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { multiSearchSelector } from "../../redux/selector";

const SearchTopKeyWordsList = ({ handleClickListKeyWords }) => {
  const data = useSelector(multiSearchSelector);
  if(data.length > 0) {
    return (
      <Box
        w="full"
        position="absolute"
        left="0"
        right="0"
        bg="#384e7b"
        transform={"translateY(7px)"}
        px="5px"
        py="10px"
        pl={'0'}
        shadow='lg'
        zIndex="100"
        rounded="5px"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <OrderedList fontSize="14px" fontWeight="light">
          {data?.map((item, i) => {
            if(!item.title) return null;
            return (
              <ListItem
                key={item.id}
                display="flex"
                alignItems="center"
                cursor="pointer"
                columnGap={"10px"}
                _notLast={{ marginBottom: "5px" }}
                onClick={() => handleClickListKeyWords(item.title)}
                _hover={{
                  color: "primaryColor",
                }}
                w="full"
              >
                <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  cursor="pointer"
                >
                  {item.title}
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
