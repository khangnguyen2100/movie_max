import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi, { postFetchApi } from "./fetchApi";
const initialState = {
  filtersValue : {
    "params": "",
    "area": "",
    "category": "",
    "year": "",
    "subtitles": "",
    "order": "up"
  },
  filtersConfig : [],
  searchData : {},
  status : 'idle'
}
const filtersSlice = createSlice({
  name : 'filters',
  initialState,
  reducers  : {
    updateFilters : (state, action) => {
      state.filtersValue = {
        ...state.filtersValue,
        ...action.payload
      }
    }
  },
  extraReducers : (builder) => {
    builder
      .addCase(getFiltersConfig.pending , (state) => {
        state.status = 'loading'
      })
      .addCase(getFiltersConfig.fulfilled, (state, action) => {
        state.filtersConfig = action.payload
        state.status = 'idle'
      })

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

export const getFiltersConfig = createAsyncThunk(
  'filters/getFiltersConfig',
  async (payload) => {
    let res = await fetchApi(payload)
    console.log( res.data.data)
    return res.data.data
  }
)
export const postSearchFiltersApi = createAsyncThunk(
  'search/postApi',
  async (payload) => {
    let res = await postFetchApi(payload)
    return res.data.data
  }
)

