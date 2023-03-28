import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchApi from './fetchApi';

const initialState = {
  week: {
    value: [],
    page: 1,
    status: 'idle',
  },
  day: {
    value: [],
    page: 1,
    status: 'idle',
  },
}
export const getTrendingSlice = createSlice({
  name: 'getTrending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // week
      .addCase(fetchTrendingWeekData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTrendingWeekData.fulfilled, (state, action) => {
        state.week.value = [...state.week.value, ...action.payload]
        state.week.page = state.week.page + 1
        state.week.status = 'done'
      })
      .addCase(fetchTrendingWeekData.rejected, (state, action) => {
        state.status = 'idle'
      })
      // day
      .addCase(fetchTrendingDayData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTrendingDayData.fulfilled, (state, action) => {
        state.day.value = [...state.day.value, ...action.payload]
        state.day.page = state.day.page + 1
        state.day.status = 'done'
      })
      .addCase(fetchTrendingDayData.rejected, (state, action) => {
        state.status = 'idle'
      })
  },
})

export const fetchTrendingWeekData = createAsyncThunk(
  'getTrending/week',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.results
  }
);
export const fetchTrendingDayData = createAsyncThunk(
  'getTrending/day',
  async (data) => {
    let res = await fetchApi(data)
    return res.data.results
  }
);