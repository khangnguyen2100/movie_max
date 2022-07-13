import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  value : {},
  pageCount : 2,
  status : 'idle',
}
const getHomeSlice = createSlice({
  name : 'getHome',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    builder
      .addCase(fetchHomeApi.pending , (state) => {
          state.status = 'loading'
      })
      .addCase(fetchHomeApi.fulfilled, (state, action) => {
        //  filter trasch dont need in recommendItems
        action.payload.recommendItems = action.payload.recommendItems.filter(item => {
          return item.coverType !== null 
        })

        if(state.value.recommendItems) {

          const newItems = action.payload.recommendItems.filter((item,i) => {
            return state.value.recommendItems.filter(stateItem => {
              if(item.homeSectionId === stateItem.homeSectionId) {
                return false
              }
            })
          })
          // homeSectionId
          state.value.page = state.pageCount
          state.value.recommendItems.push(...newItems)
        } else {
          state.value = action.payload
        }
        state.pageCount++
        state.status = 'idle'
      })
      .addCase(fetchHomeApi.rejected, (state, action) => {
        state.status = 'idle'
      })
  }
})
export default getHomeSlice

export const fetchHomeApi = createAsyncThunk(
  'getHome/fetchHomeApi',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.data
  }
);