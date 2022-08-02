import React, { useEffect} from "react";
import { Box, Center} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchHomeApi } from "../../services/getHomeSlice";
import { getHomSelector } from "../../redux/selector";

import { fetchLeaderBoardSlice } from "../../services/searchLeaderBoardSlice";

import Section from "../../components/Section/Section";
import ButtonLink from "../../components/Buttons/ButtonLink";
import Loading from "../../components/Loading/Loading";
const Home = () => {
  const dispatch = useDispatch();
  const { value, status, pageCount } = useSelector(getHomSelector);
  const handleDispatchAction = () => {
    dispatch(
      fetchLeaderBoardSlice({
        path: "search/v1/searchLeaderboard",
      })
    )
    dispatch(
      fetchHomeApi({
        path: "homePage/getHome",
        params: { page: pageCount },
      })
    )
  };
  useEffect(() => {
    if (Object.keys(value).length === 0) {
      handleDispatchAction();
    }
  }, []);

  return (
    <InfiniteScroll
      dataLength={pageCount}
      next={status === 'idle' ? handleDispatchAction : ''}
      hasMore={pageCount < 20}
      loader={
        <Center>
          <Loading />
        </Center>
      }
      endMessage={
        <Box onClick={handleDispatchAction}>
          <ButtonLink content={"See More"} />
        </Box>
      }
    >
      {value?.recommendItems?.map((item, i) => {
        if (item.coverType) {
          return <Section key={i} data={item} />;
        }
      })}
    </InfiniteScroll>
  );
};

export default Home;
