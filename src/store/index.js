// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import hierarchyReducer from './hierarchySlice';

const store = configureStore({
  reducer: {
    hierarchy: hierarchyReducer,
  },
});

export default store;
