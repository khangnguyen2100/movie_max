import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  value : {},
  status : 'idle',
}
export const searchLeaderBoardSlice = createSlice({
  name : 'searchLeaderBoard',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    builder
      .addCase(fetchLeaderBoardSlice.pending , (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLeaderBoardSlice.fulfilled, (state, action) => {
        state.value = action.payload
        state.status = 'success'
      })
      .addCase(fetchLeaderBoardSlice.rejected, (state, action) => {
        state.status = 'idle'
      })
  }
})

export const fetchLeaderBoardSlice = createAsyncThunk(
  'search/fetchLeaderBoardSlice',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.data
  }
);