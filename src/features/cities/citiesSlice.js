import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCityWeather } from '../../utils/fetchers';

export const fetchCityData = createAsyncThunk(
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
  reducers: {
    removeCity: (state, action) => {
      const { names, weatherByName } = state;
      const filteredNames = names.filter((n) => n !== action.payload);
      state.names = filteredNames;
      state.weatherByName = filteredNames.reduce((acc, el) => {
        const data = weatherByName[el];
        return { ...acc, data };
      }, {});
    },
  },
  extraReducers: {
    [fetchCityData.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchCityData.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        const {
          payload: { name },
        } = action;
        state.names.push(name);
        state.weatherByName[name] = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetchCityData.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { addCity, removeCity } = citiesSlice.actions;

export const selectCities = (state) => state.cities;

export default citiesSlice.reducer;
