import { configureStore } from '@reduxjs/toolkit';
import hierarchyReducer from './hierarchySlice';

const store = configureStore({
  reducer: {
    hierarchy: hierarchyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
