import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  value : {},
  pageCount : 1,
  status : 'idle',
}
export const getHomeSlice = createSlice({
  name : 'getHome',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    builder
      .addCase(fetchHomeApi.pending , (state) => {
          state.status = 'loading'
      })
      .addCase(fetchHomeApi.fulfilled, (state, action) => {
        state.value = action.payload
        state.pageCount++
        state.status = 'done'
        
      })
      .addCase(fetchHomeApi.rejected, (state, action) => {
        state.status = 'idle'
      })
  }
})

export const fetchHomeApi = createAsyncThunk(
  'getHome/fetchHomeApi',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.results
  }
);