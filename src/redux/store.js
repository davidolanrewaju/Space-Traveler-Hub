import { configureStore } from '@reduxjs/toolkit';
import missionReducer from './missions/missionSlice';

const store = configureStore({
  reducer: {
    mission: missionReducer,
  },
});

export default store;
