/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import { Box, Center } from "@chakra-ui/react";

import ButtonLink from "src/components/Buttons/ButtonLink";
import TrendingKeyWord from "src/components/Home/TrendingKeyWord";
import Loading from "src/components/Loading/Loading";
import Section from "src/components/Section/Section";
import { getHomSelector } from "src/redux/selector";
import { fetchHomeApi } from "src/services/getHomeSlice";
export const Home = () => {
  const dispatch = useDispatch();

  const { value, status, pageCount } = useSelector(getHomSelector);
  const handleDispatchAction = () => {
    dispatch(
      fetchHomeApi({
        path: "trending/all/week",
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
    {
      status === 'done' && 
      <Section data={value} name="Trending" />
    }
    </>
  );
};

