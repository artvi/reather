import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../features/cities/citiesSlice';

export default configureStore({
  reducer: {
    cities: citiesReducer,
  },
});
