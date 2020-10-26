import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../features/cities/citiesSlice';
import { saveState } from '../localStorage';


const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState().cities.names);
});

export default store;
