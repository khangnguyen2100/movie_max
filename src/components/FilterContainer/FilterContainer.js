import React, { useEffect } from "react";
import { Box,Tabs,Tab,TabList,TabPanel,TabPanels, } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../utils/themeConfig";
import filtersSlice, {postSearchFiltersApi,getFiltersConfig} from "../../services/filtersSlice";
import {filtersSelector as filtersSelectorData, filtersConfig} from "../../redux/selector";

const FilterContainer = () => {
  const tabActiveBorderBottomColor = "#1A202C";
  const tabActiveBorderColor = "#2d3a55";
  const {primaryColor} = colors
  const tabSelectedStyle = {
    color: primaryColor,
    border: `1px solid ${tabActiveBorderColor}`,
    borderBottom: `1px solid ${tabActiveBorderBottomColor}`,
  };

  const dispatch = useDispatch();
  const filtersSelector = useSelector(filtersSelectorData);
  const filtersConfigSelector = useSelector(filtersConfig);

  const handleAddFilter = (obj) => {
    dispatch(filtersSlice.actions.updateFilters(obj));
  };
  useEffect(() => {
    dispatch(
      getFiltersConfig({
        path: "search/list",
      })
    );
  }, []);
  useEffect(() => {
    if (Object.keys(filtersSelector).length !== 0) {
      dispatch(
        postSearchFiltersApi({
          path: "search/v1/search",
          params: {
            size: 18,
            ...filtersSelector
          },
        })
      );
    }
  }, [filtersSelector]);

  return (
      <Tabs>
        <TabList mt="50px" maxWidth={"max-content"}>
          {filtersConfigSelector?.map((item,i) => {
            return (
              <Tab
                key={item.id}
                px='20px'
                cursor="pointer"
                fontWeight="bold"
                fontSize={{ base: "16px", md: "18px" }}
                _selected={{
                  color : 'primaryColor',
                  borderBottom : `2px solid ${primaryColor}`
                }}
                onClick={() => {
                  handleAddFilter({
                    params: item.params,
                  });
                }}
              >
                {item.name}
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          {filtersConfigSelector?.map(filterItem => {
            return (
              <TabPanel key={filterItem.id}>
              
                <Tabs
                  isFitted={true}
                  mt="30px"
                  maxW="1000px"
                  size={{ base: "sm", md: "md" }}
                  variant="enclosed"
                >
                  <TabList
                    style={{
                      borderBottom: `1px solid ${tabActiveBorderColor}`,
                    }}
                  >
                    {filterItem.screeningItems.map((screening,i) => {
                      
                      return (
                        <Tab
                          _selected={tabSelectedStyle}
                          key={i}
                          fontSize={{ base: "12px", md: "16px" }}
                          fontWeight="600"
                        >
                          {screening.name}
                        </Tab>
                      );
                    })}
                  </TabList>
                  <TabPanels
                    border={`1px solid ${tabActiveBorderColor}`}
                    borderTop='none'
                    rounded="0 0 10px 10px"
                  >
                    {filterItem.screeningItems.map((filter, i) => {
                      return (
                        <TabPanel key={i}>
                          {filter.items.map((item, j) => {
                            let style = {}
                            if(filtersSelector[item.screeningType] == item.params) {
                              style={
                                color : primaryColor,
                              }
                            }
                            return (
                              <Box
                                key={j}
                                display="inline-block"
                                cursor="pointer"
                                margin="5px"
                                p="5px 10px"
                                fontSize={{ base: "12px", md: "14px" }}
                                fontWeight="black"
                                _hover={{ color: "primaryColor" }}
                                style={style}
                                onClick={() => {
                                  handleAddFilter({
                                    [item.screeningType] : item.params
                                  });
                                }}
                              >
                                {item.name}
                              </Box>
                            );
                          })}
                        </TabPanel>
                      );
                    })}
                    
                  </TabPanels>
                </Tabs>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
  );
};

export default FilterContainer;
