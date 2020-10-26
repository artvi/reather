import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../slices/citiesSlice';
import { saveState } from '../utils/localStorage';

const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState().cities.names);
});

export default store;
