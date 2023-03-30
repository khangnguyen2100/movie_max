import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  config : {},
  status : 'idle',
}
export const getConfigSlice = createSlice({
  name : 'getConfig',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    builder
      .addCase(getConfig.pending , (state) => {
        state.status = 'loading'
      })
      .addCase(getConfig.fulfilled, (state, action) => {
        state.config = action.payload
        state.status = 'done'
      })
      .addCase(getConfig.rejected, (state, action) => {
        state.status = 'idle'
      })
  }
})

export const getConfig = createAsyncThunk(
  'getConfig',
  async (data) => {
    let res = await fetchApi(data)
    return res.data
  }
);