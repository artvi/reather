import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCityWeather } from '../../utils/fetchers';

export const fetchWeatherData = createAsyncThunk(
  'cities/fetchCityForecast',
  async (cityName, { getState, requestId }) => {
    const { loading, currentRequestId } = getState().cities;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
      const response = await fetchCityWeather(cityName);
      return response;
  }
);

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    names: [],
    weatherByName: {},
    loading: 'idle',
    error: null,
    currentRequestId: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchWeatherData.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchWeatherData.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        const { payload: { name  }} = action;
        state.names.push(name);
        state.weatherByName[name] = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetchWeatherData.rejected]: (state, action) => {
      const { requestId } = action.meta;
      console.log('REQUEST REJECTED');
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { addCity, removeLast } = citiesSlice.actions;

export const selectCities = (state) => state.cities;

export default citiesSlice.reducer;
