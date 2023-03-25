import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  slider: {
    data: [],
    status: 'idle',
  },
  value: [],
  status: 'idle',
}
export const getHomeSlice = createSlice({
  name: 'getHome',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // home
      .addCase(fetchHomeApi.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchHomeApi.fulfilled, (state, action) => {
        const type = action.meta.arg.type
        state.value = {
          ...state.value,
            [type]: action.payload
          }
        state.status = 'done'
      })
      .addCase(fetchHomeApi.rejected, (state, action) => {
        state.status = 'idle'
      })
      // Slider
      .addCase(getHomeSlider.pending, (state) => {
        state.slider.status = 'loading'
      })
      .addCase(getHomeSlider.fulfilled, (state, action) => {
        state.slider.data = action.payload
        state.slider.status = 'done'
      })
      .addCase(getHomeSlider.rejected, (state, action) => {
        state.slider.status = 'idle'
      })
  },
})

export const fetchHomeApi = createAsyncThunk(
  'getHome/fetchHomeApi',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.results
  }
);
export const getHomeSlider = createAsyncThunk(
  'getHome/getHomeSlider',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.results
  }
);