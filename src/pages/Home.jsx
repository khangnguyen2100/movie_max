/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Section from "src/components/Section/Section";
import SectionTrending from "src/components/Section/SectionTrending";

import { getHomSelector } from "src/redux/selector";
import { fetchHomeApi } from "src/services/getHomeSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const { value, status } = useSelector(getHomSelector);
  const [trendingInWeek, setTrendingInWeek] = useState(true);
  
  useEffect(() => {
    // get trending
    dispatch(
      fetchHomeApi({
        path: 'trending/all/week',
        type: 'trending_week'
      })
    );
    dispatch(
      fetchHomeApi({
        path: 'trending/all/day',
        type: 'trending_day'
      })
    );
    // popular movies
    dispatch(
      fetchHomeApi({
        path: "movie/popular",
        type: 'movie'
      })
    );
    // popular tv
    dispatch(
      fetchHomeApi({
        path: "tv/popular",
        type: 'tv'
      })
    );
  }, []);
  return (
    <>
      {
        status === 'done' && (
          <>
          <SectionTrending data={trendingInWeek ? value.trending_week : value.trending_day} name="Trending" trendingInWeek={trendingInWeek} setTrendingInWeek={setTrendingInWeek} />
          <Section link="/movie/popular" data={value.movie} name="Popular Movie" type='movie' />
          <Section link="/tv/popular" data={value.tv} name="Popular Series" type='tv' />
          </>
        )
      }
    </>
  );
};

