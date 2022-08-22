import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Center } from "@chakra-ui/react";

import { searchFiltersSelector, filtersSelector } from "../redux/selector";
import { postSearchFiltersApi } from "../services/filtersSlice";
import FilterContainer from "../components/FilterContainer/FilterContainer";
import ListFilmLayout from "../components/Layout/ListFilmLayout";
import Loading from "../components/Loading/Loading";

const Filters = () => {
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

export default Filters;
