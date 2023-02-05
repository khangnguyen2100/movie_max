/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import { Box, Center } from "@chakra-ui/react";

import ButtonLink from "../components/Buttons/ButtonLink";
import TrendingKeyWord from "../components/Home/TrendingKeyWord";
import Loading from "../components/Loading/Loading";
import Section from "../components/Section/Section";
import { getHomSelector } from "../redux/selector";
import { fetchHomeApi } from "../services/getHomeSlice";
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

