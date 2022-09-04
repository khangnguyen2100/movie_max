/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { Box, Center } from "@chakra-ui/react";

import { fetchHomeApi } from "../services/getHomeSlice";
import { getHomSelector } from "../redux/selector";

import TrendingKeyWord from "../components/Home/TrendingKeyWord";
import Section from "../components/Section/Section";
import ButtonLink from "../components/Buttons/ButtonLink";
import Loading from "../components/Loading/Loading";

const Home = () => {
  // console.log('Home page');
  const dispatch = useDispatch();

  const { value, status, pageCount } = useSelector(getHomSelector);
  const handleDispatchAction = () => {
    dispatch(
      fetchHomeApi({
        path: "homePage/getHome",
        params: { page: pageCount },
      })
    );
  };
  useEffect(() => {
    if (Object.keys(value).length === 0) {
      handleDispatchAction();
    }
  }, []);

  return (
    <>
      <TrendingKeyWord />
      <InfiniteScroll
        dataLength={pageCount}
        next={status === "idle" ? handleDispatchAction : ""}
        hasMore={pageCount < 30}
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
    </>
  );
};

export default Home;
