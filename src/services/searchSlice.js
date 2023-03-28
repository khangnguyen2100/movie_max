import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchApi from "./fetchApi";

const initialState = {
  value : [],
  status : 'idle'
}
export const multiSearchSlice = createSlice({
  name : 'multiSearch',
  initialState,
  reducers : {

  },
  extraReducers : (builder) => {
    builder
      .addCase(multiSearch.pending ,(state) => {
        state.status = 'loading'
      })
      .addCase(multiSearch.fulfilled, (state, action) => {
        state.value = action.payload
        state.status = 'idle'
      })
  }
})

export const multiSearch = createAsyncThunk(
  'search/multiSearch',
  async (payload) => {
    let res = await fetchApi(payload)
    return res.data.results
  }
)