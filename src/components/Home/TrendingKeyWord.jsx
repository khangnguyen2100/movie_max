/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from "react";
import { Flex, Box, Heading, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLeaderBoardSlice } from "../../services/searchLeaderBoardSlice";
import { searchLeaderBoardSelector } from "../../redux/selector";

const TrendingKeyWord = () => {
  const dispatch = useDispatch();
  const { status, value: data } = useSelector(searchLeaderBoardSelector);
  const keyWordsCount = useBreakpointValue({ 
    base: 6, 
    md: 8, 
    xl: 10, 
  }, {
    fallback: 10
  })

  useEffect(() => {
    dispatch(
      fetchLeaderBoardSlice({
        path: "search/v1/searchLeaderboard",
      })
    );
  }, []);

  return (
    <Box>
      <Heading
        textTransform="capitalize"
        mb="30px"
        fontSize={{
          base: "xl",
          md: "2xl",
        }}
      >
        Most trending
      </Heading>
      <Flex
        mb="30px"
        align="flex-start"
        wrap={"wrap"}
      >
        {status === "success" &&
          // eslint-disable-next-line array-callback-return
          data?.list?.map((keyword, i) => {
            if (keyWordsCount >= i + 1) {
              return (
              <Box
                key={i}
                p='15px'
                rounded="5px"
                mb={"15px"}
                color="primaryColor"
                fontWeight={"600"}
                letterSpacing="1.5px"
                transition="all .25s"
                fontSize={"15px"}
                w={{
                  base : '50%',
                  md : '25%',
                  xl : '20%'
                }}
                position="relative"
                overflow="hidden"
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
                textAlign="center"
                _hover={{
                  backgroundColor: "backgroundBtnColor",
                }}
              >
                <Link 
                  to={`/detail/${keyword.domainType}/${keyword.id}`}
                  style={{
                    padding : "15px",
                  }}
                >
                  <Tooltip
                    label={keyword.title.length > 25 ? keyword.title : ""}
                    aria-label="A tooltip"
                    bg="primaryDarkColor"
                    color="#eee"
                  >
                    {keyword.title}
                  </Tooltip>
                </Link>
                <Box
                  position={"absolute"}
                  top="3px"
                  right={"3px"}
                  fontSize="16px"
                  // backgroundColor='rgba(50,138,241,.25)'
                  fontWeight={"bold"}
                  rounded={"50%"}
                  w="20px"
                  h="20px"
                  fontFamily={'monospace'}
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  color={"#f1c40f"}
                >
                  {i + 1}
                </Box>
              </Box>
            );
            }
            
          })}
      </Flex>
    </Box>
  );
};

export default memo(TrendingKeyWord);
