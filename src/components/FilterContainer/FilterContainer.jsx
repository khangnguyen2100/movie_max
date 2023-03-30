/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from "react";
import { Box,Tabs,Tab,TabList,TabPanel,TabPanels, } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from 'src/utils/chakraConfig'
import { filtersSlice, getFiltersConfig } from "src/services/filtersSlice";
import {filtersSelector as filtersSelectorData, filtersConfig} from "src/redux/selector";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs>
      {/* movie type  */}
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
                  "area": "",
                  "category": "",
                  "year": "",
                  "subtitles": "",
                  "order": "up"
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
                {/* head name */}
                <TabList
                  style={{
                    borderBottom: `1px solid ${tabActiveBorderColor}`,
                  }}
                >
                  {filterItem.screeningItems.map((screening,i) => {
                    let name = screening.name
                    if(i === 3) {
                      name = "Subtitles"
                    }
                    if(i === 4) {
                      name = "Compare"
                    }
                    return (
                      <Tab
                        _selected={tabSelectedStyle}
                        key={i}
                        fontSize={{ base: "12px", md: "16px" }}
                        fontWeight="600"
                      >
                        {name}
                      </Tab>
                    );
                  })}
                </TabList>
                {/* body */}
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
                          if(filtersSelector[item.screeningType] === item.params) {
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

export default memo(FilterContainer);
