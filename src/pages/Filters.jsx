import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Center } from "@chakra-ui/react";

import { searchFiltersSelector, filtersSelector } from "src/redux/selector";
import { postSearchFiltersApi } from "src/services/filtersSlice";
import FilterContainer from "src/components/FilterContainer/FilterContainer";
import ListFilmLayout from "src/components/Layout/ListFilmLayout";
import Loading from "src/components/Loading/Loading";

export const Filters = () => {
  const dispatch = useDispatch();
  const searchData = useSelector(searchFiltersSelector);
  const filtersSelectorData = useSelector(filtersSelector);
  
  useEffect(() => {
    dispatch(
      postSearchFiltersApi({
        path: "search/v1/search",
        params: {
          size: 18,
          ...filtersSelectorData,
        },
      })
    );
  },[dispatch, filtersSelectorData])
  
  const handleScrollDispatch = () => {
    let searchDataLength = searchData.length + 18;
    dispatch(
      postSearchFiltersApi({
        path: "search/v1/search",
        params: {
          size: searchDataLength,
          ...filtersSelectorData,
        },
      })
    );
  };
  return (
    <>
      {searchData?.length > 0 && (
        <InfiniteScroll
          dataLength={searchData?.length || 0}
          hasMore={searchData?.length <= 120}
          next={handleScrollDispatch}
          style={{
            overflow: "hidden",
          }}
          loader={
            <Center>
              <Loading />
            </Center>
          }
        >
          <FilterContainer />
          <ListFilmLayout listFilm={searchData} />
        </InfiniteScroll>
      )}
    </>
  );
};
