import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "./fetchApi";

const initialState = {
  tvDetail : [],
  seasonDetail : [],
  status : 'idle'
}
export const tvDetailSlice = createSlice({
  name : 'tvDetail',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    builder
      .addCase(getTvDetail.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTvDetail.fulfilled, (state, action) => {
        const path = action.meta.arg.path

        if (path.includes('season')) {
          state.seasonDetail = action.payload
        } else {
          state.tvDetail = action.payload
        }
        state.status = 'done'
      })
      .addCase(getTvDetail.rejected, (state, action) => {
        state.status = 'idle'
      })
  }
})

export const getTvDetail = createAsyncThunk(
  'getTvDetail',
  async (payload) => {
    let res = await fetchApi(payload)
    return res.data
  }
)