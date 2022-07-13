import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi, { postfetchApi } from "./fetchApi";
const initialState = {
  filtersValue : {
    type : {
      value : 'TV Series',
      idFilterValue : 0
    },
    regions : {
      id : 0,
      value : 'All regions', 
      idFilterValue : 0
    },
    categories : {
      id : 1,
      value : 'All Categories',
      idFilterValue : 0,
    },
    timePeriods : {
      id : 2,
      value : 'All Time Periods',
      idFilterValue : 0
    },
    subtitles : {
      id : 3,
      value :  'All Subtitles',
      idFilterValue : 0,
    },
    recent : {
      id : 4,
      value :  'Recent',
      idFilterValue : 0
    },
  },
  searchData : {},
  status : 'idle'
}
const filtersSlice = createSlice({
  name : 'filters',
  initialState,
  reducers  : {
    updateFilters : (state, action) => {
      const {payload : {filterName, value, idFilterValue}} = action
      state.filtersValue[filterName].value = value
      
      state.filtersValue[filterName].idFilterValue = idFilterValue

    } 
  },
  extraReducers : (builder) => {
    builder
      .addCase(postSearchFiltersApi.pending , (state) => {
        state.status = 'loading'
      })
      .addCase(postSearchFiltersApi.fulfilled, (state, action) => {
        state.searchData = action.payload
        state.status = 'idle'
      })
  }
})
export default filtersSlice

export const getSearchFiltersApi = createAsyncThunk(
  'search/getApi',
  async (payload) => {
    let res = await fetchApi(payload)
    return res.data.data
  }
)
export const postSearchFiltersApi = createAsyncThunk(
  'search/postApi',
  async (payload) => {
    let res = await postfetchApi(payload)
    return res.data.data
  }
)

