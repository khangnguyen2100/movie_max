import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import ListFilmInfinity from 'src/components/Layout/ListFilmInfinity'
import { getTrendingDaySelector } from 'src/redux/selector'
import { fetchTrendingDayData } from 'src/services'

export const TrendingDay = () => {
  const dispatch = useDispatch()
  let pageCount = useRef(0)
  const { value, status, page } = useSelector(getTrendingDaySelector);
  const handleDispatchAction = useCallback(() => {
    dispatch(
      fetchTrendingDayData({
        path: `trending/all/day`,
        params: { page: ++pageCount.current },
      })
    );
  }, [dispatch]);
    
  useEffect(() => {
    pageCount.current = 0;
    handleDispatchAction();
    window.scrollTo(0, 0);
  }, [handleDispatchAction]);
  return (
    <Box mt={'50px'}>
      <Flex mb="30px" justify="space-between" align="center">
        <Heading
          textTransform="capitalize"
          fontSize={{
            base: "xl",
            md: "2xl",
            lg: "3xl",
          }}
        >
          Top trending today
        </Heading>
      </Flex>
      <ListFilmInfinity listFilm={value || []} status={status} pageCount={page} dispatchAction={handleDispatchAction} />
    </Box>
  )
}
