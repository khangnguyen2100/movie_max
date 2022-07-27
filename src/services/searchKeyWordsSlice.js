import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { postFetchApi } from "./fetchApi";

const initialState = {
  value : {
    searchKeyWords : {},
    searchTopKeyWords : {},
  },
  status : 'idle'
}
const searchKeyWordsSlice = createSlice({
  name : 'searchKeyWords',
  initialState,
  reducers : {

  },
  extraReducers : (builder) => {
    builder
      .addCase(searchTopKeyWords.pending ,(state) => {
        state.status = 'loading'
      })
      .addCase(searchTopKeyWords.fulfilled, (state, action) => {
        state.value.searchTopKeyWords = action.payload
        state.status = 'idle'
      })
      .addCase(searchKeyWords.pending ,(state) => {
        state.status = 'loading'
      })
      .addCase(searchKeyWords.fulfilled, (state, action) => {
        state.value.searchKeyWords = action.payload
        state.status = 'idle'
      })
  }
})
export default searchKeyWordsSlice

export const searchKeyWords = createAsyncThunk(
  'search/v1/searchWithKeyWord',
  async (payload) => {
    let res = await postFetchApi(payload)
    return res.data.data
  }
)
export const searchTopKeyWords = createAsyncThunk(
  'search/searchTopKeyWords',
  async (payload) => {
    let res = await postFetchApi(payload)
    return res.data.data
  }
)