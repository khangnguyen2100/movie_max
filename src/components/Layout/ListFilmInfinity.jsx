import { Box, Center, Flex } from "@chakra-ui/react";
import React, { memo } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { getConfigSelector } from "../../redux/selector";
import Film from "../Film/Film";

import Loading from "src/components/Loading/Loading";

const ListFilmInfinity = ({ listFilm, dispatchAction, status, pageCount }) => {
  const { config } = useSelector(getConfigSelector);
  return (
    <InfiniteScroll
      dataLength={pageCount}
      next={status === "done" ? dispatchAction : ""}
      hasMore={pageCount < 10}
      loader={
        <Center>
          <Loading />
        </Center>
      }
    >
      <Flex
        mt="50px"
        display="flex"
        alignItems="flex-start"
        justifyContent={'center'}
        flexWrap="wrap"
        overflow='hidden'
      >
        {listFilm?.map((item, index) => {
          if (Boolean(item.backdrop_path)) {
            return (
              <Box
                key={`${item.id}-${index}`}
                w={{
                  base: "calc(33.334% - 10px)",
                  md: "calc(25% - 15px)",
                  lg: "calc(16.667% - 15px)",
                }}
                mb="50px"
                mx={{
                  base: "5px",
                  md: "7.5px",
                }}
              >
                <Film
                  baseUrl={`${config?.images?.base_url}/original/`}
                  media_type={item.media_type}
                  id={item.id}
                  vote_average={item.vote_average || 0}
                  poster_path={item.poster_path}
                  title={item.title}
                  name={item.name}
                />
              </Box>
            );
          }
          return null;

        })}
      </Flex>
    </InfiniteScroll>
  );
};

export default memo(ListFilmInfinity);
