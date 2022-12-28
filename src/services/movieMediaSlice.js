import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "./fetchApi";

const initialState = {
  movieMedia : {},
  status : 'idle'
}
export const movieMediaSlice = createSlice({
  name : 'movieMedia',
  initialState,
  reducers : {

  },
  extraReducers : (builder) => {
    builder
      .addCase(getMovieMedia.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getMovieMedia.fulfilled, (state, action) => {
        state.movieMedia = action.payload
        state.status = 'idle'
      })
  }
})

export const getMovieMedia = createAsyncThunk(
  'detail/getMovieMedia',
  async (payload) => {
    let res = await fetchApi(payload)
    return res.data.data
  }
)