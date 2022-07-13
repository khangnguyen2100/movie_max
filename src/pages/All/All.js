import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Center } from "@chakra-ui/react";

import FilterContainer from "../../components/FilterContainer/FilterContainer";
import { searchFiltersSelector, filtersSelector } from "../../redux/selector";
import {postSearchFiltersApi,} from "../../services/filtersSlice";
import { handleConvertParams } from "../../utils/filterConfig";
import Loading from "../../components/Loading/Loading";
import ListFilmLayout from "../../components/Layout/ListFilmLayout";

const All = () => {
  const dispatch = useDispatch();
  const searchData = useSelector(searchFiltersSelector);
  const filtersSelectorData = useSelector(filtersSelector)
  const [searchDataValue, setSearchDataValue] = useState({});

  useEffect(() => {
    setSearchDataValue(searchData?.searchResults)
  },[searchData])
  useEffect(() => {
    
  })
  const handleScrollDispatch = () => {
    let searchDataLength = searchData.searchResults.length + 18
    dispatch(
      postSearchFiltersApi({
        path: "search/v1/search",
        params: {
          size: searchDataLength,
          ...handleConvertParams(filtersSelectorData),
        },
      })
    );
  };
  return (
    <InfiniteScroll
      dataLength={searchDataValue?.length || 0}
      hasMore={searchDataValue?.length <= 90}
      next={handleScrollDispatch}
      style={{
        overflow : "hidden"
      }}
      loader={
        <Center>
          <Loading />
        </Center>
      }
    >
      <FilterContainer />
      <ListFilmLayout listFilm={searchData?.searchResults} />
    </InfiniteScroll>
  );
};

export default All;
