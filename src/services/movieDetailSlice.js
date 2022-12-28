import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "./fetchApi";

const initialState = {
  movieDetail : {},
  status : 'idle'
}
export const movieDetailSlice = createSlice({
  name : 'movieDetail',
  initialState,
  reducers : {

  },
  extraReducers : (builder) => {
    builder
      .addCase(getMovieDetail.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload
        state.status = 'idle'
      })
  }
})

export const getMovieDetail = createAsyncThunk(
  'detail/getMovieDetail',
  async (payload) => {
    let res = await fetchApi(payload)
    return res.data.data
  }
)