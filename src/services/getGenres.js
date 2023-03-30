import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  genres : {
    movie: [],
    tv: []
  },
  status : 'idle',
}
export const getGenresSlice = createSlice({
  name : 'getGenres',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    builder
      .addCase(getGenres.pending , (state) => {
        state.status = 'loading'
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        const type = action.payload.type
        state.genres[type] = action.payload.genres
        state.status = 'done'
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.status = 'idle'
      })
  }
})

export const getGenres = createAsyncThunk(
  'getGenres',
  async (data) => {
    let res = await fetchApi(data)
    return {...res.data, type: data.type}
  }
);