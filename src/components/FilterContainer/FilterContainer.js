import React,{useEffect} from 'react'
import { Box, Flex, Tabs, Tab, TabList, TabPanel, TabPanels} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { filterHead, filterType, filters } from '../../utils/filterConfig'
import filtersSlice, {postSearchFiltersApi} from '../../services/filtersSlice'
import { filtersSelector as filtersSelectorData } from '../../redux/selector'
import { handleConvertParams } from '../../utils/filterConfig'

const FilterContainer = () => {
  const tabActiveBorderBottomColor = '#1A202C'
  const tabActiveBorderColor = '#2d3a55'
  const primaryColor = 'rgba(50, 138, 241, 1)'
  const tabSelectedStyle = {
    color : primaryColor,
    border : `1px solid ${tabActiveBorderColor}`,
    borderBottom : `1px solid ${tabActiveBorderBottomColor}`
  }
  
  const dispatch = useDispatch()
  const filtersSelector = useSelector(filtersSelectorData)
  
  const handleAddFilter = (obj) => {
    dispatch(filtersSlice.actions.updateFilters(obj))
  }

  useEffect(() => {
    if(Object.keys(filtersSelector).length !== 0) {
      dispatch(postSearchFiltersApi({
        path : 'search/v1/search',
        params : {
          "size": 18,
          ...handleConvertParams(filtersSelector)
        }
      }))
    }
  },[filtersSelector])
  
  return (
    <Box>
      <Flex
        mt='50px'
      >
        {filterType.map((name,i) => {
            let style = {}
            if(filtersSelector?.type?.value === name) {
              style = {
                color : primaryColor,
                borderBottom : '2px solid currentColor'
              }
            }
          return (
            <Box key={i} p="2px 5px" _first={{marginRight : '20px'}}  cursor='pointer' fontWeight='bold'
              style={style}
              onClick={() => {
                handleAddFilter({
                  filterName : 'type',
                  value : name,
                  idFilterValue : i
                })
              }}
            >
              {name}
            </Box>
          )
        })}
      </Flex>
      <Tabs isFitted={true} mt='30px' maxW="1000px" size={{base : 'sm' ,md : "md"}} variant='enclosed'>
        <TabList style={{
          borderBottom : `1px solid ${tabActiveBorderColor}`
        }}>
          {
            filterHead.map((headName,i) => {
              return <Tab _selected={tabSelectedStyle} key={i} fontSize={{base : '12px', md : '16px'}} fontWeight="600" >{headName}</Tab>
            })
          }
        </TabList>
        <TabPanels borderLeft={`1px solid ${tabActiveBorderColor}`}  borderRight={`1px solid ${tabActiveBorderColor}`} borderBottom={`1px solid ${tabActiveBorderColor}`} rounded='0 0 10px 10px'>
        {filters.map((filter,i) => {
          return (
            <TabPanel key={i}>
              {filter.value.map((item,j) => {
                let style = {}
                if(filtersSelector?.[filter.name]?.value === item) {
                  style={
                    color : primaryColor,
                  }
                } else {
                  style = {}
                }
                return (
                  <Box key={j} display="inline-block" cursor='pointer' margin='5px' p='5px 10px'
                    fontSize={{base : '12px', md : '14px'}}
                    fontWeight='black' _hover={{color : 'primaryColor'}} 
                    style={style}
                    onClick={() => {
                      handleAddFilter({
                        filterName : filters[i].name,
                        value : item,
                        idFilterValue : j
                      })
                    }}
                  >
                    {item}
                  </Box>
                )
              } )}
            </TabPanel>
          )
        })}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default FilterContainer