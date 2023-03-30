import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  value: [],
  page: 1,
  currentPage: 'popular',
  status: 'idle',
}
export const getMovieSlice = createSlice({
  name: 'getMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // home
      .addCase(fetchMoviesData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMoviesData.fulfilled, (state, action) => {
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
      .addCase(fetchMoviesData.rejected, (state, action) => {
        state.status = 'idle'
      })
  },
})

export const fetchMoviesData = createAsyncThunk(
  'getMovie',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.results
  }
);