import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import missionReducer from './missions/missionSlice';
import rocketReducer from './rockets/rocketsSlice';

const store = configureStore({
  reducer: {
    rockets: rocketReducer,
    mission: missionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
