import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  value: [],
  page: 1,
  currentPage: 'popular',
  status: 'idle',
}
export const getTvSlice = createSlice({
  name: 'getTv',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // home
      .addCase(fetchTvData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTvData.fulfilled, (state, action) => {
        const path = action.meta.arg.path
        if(path.includes(state.currentPage)) {
          state.value = [...state.value, ...action.payload]
          state.page = state.page + 1
        } else {
          state.value = action.payload
          state.page = 1
        }
        state.currentPage = path.split('/')[1]
        state.status = 'done'
      })
      .addCase(fetchTvData.rejected, (state, action) => {
        state.status = 'idle'
      })
  },
})

export const fetchTvData = createAsyncThunk(
  'geTv',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.results
  }
);