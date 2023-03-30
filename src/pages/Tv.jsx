import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import ListFilmInfinity from 'src/components/Layout/ListFilmInfinity'
import { getTvSelector } from 'src/redux/selector'
import { fetchTvData } from 'src/services'

const HeadingLookup = {
  popular: 'Popular',
  airing_today: 'Airing Today',
  'on_the_air': 'On TV',
  'top_rated': 'Top Rated'
}
export const Tv = ({ type = 'popular' }) => {
  const dispatch = useDispatch()
  let pageCount = useRef(0)
  const { value, status, page } = useSelector(getTvSelector);
  const handleDispatchAction = useCallback(() => {
    dispatch(
      fetchTvData({
        path: `tv/${type}`,
        params: { page: ++pageCount.current },
      })
    );
  }, [dispatch, type]);
    
  useEffect(() => {
    pageCount.current = 0;
    handleDispatchAction();
    window.scrollTo(0, 0);
  }, [type, handleDispatchAction]);
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
          {HeadingLookup[type]}
        </Heading>
      </Flex>
      <ListFilmInfinity listFilm={value || []} status={status} pageCount={page} dispatchAction={handleDispatchAction} />
    </Box>
  )
}
