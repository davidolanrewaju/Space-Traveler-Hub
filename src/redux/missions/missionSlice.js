//

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  missions: [],
  isLoading: false,
  error: null,
  reservedMissions: [], // New state property to hold reserved mission IDs
};

const url = 'https://api.spacexdata.com/v3/missions';

export const getMissions = createAsyncThunk('missions/getMissions', async (_, thunkAPI) => {
  try {
    const response = await axios.get(url);
    const missionArray = response.data.map((mission) => ({
      ...mission,
      reserved: false, // Add initial reserved property
    }));
    return missionArray;
  } catch (error) {
    return thunkAPI.rejectWithValue('Something Went Wrong');
  }
});

const missionSlice = createSlice({
  name: 'mission',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      const missionId = action.payload;
      state.missions = state.missions.map((mission) => (
        mission.mission_id !== missionId ? mission : { ...mission, reserved: true }
      ));
      state.reservedMissions.push(missionId);
      sessionStorage.setItem('reservedMissions', JSON.stringify(state.reservedMissions));
    },
    leaveMission: (state, action) => {
      const missionId = action.payload;
      state.missions = state.missions.map((mission) => (
        mission.mission_id !== missionId ? mission : { ...mission, reserved: false }
      ));
      state.reservedMissions = state.reservedMissions.filter((id) => id !== missionId);
      sessionStorage.setItem('reservedMissions', JSON.stringify(state.reservedMissions));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload;

        // Retrieve reserved mission IDs from session storage
        const storedMissions = JSON.parse(sessionStorage.getItem('reservedMissions'));
        if (storedMissions) {
          state.reservedMissions = storedMissions;
          // Update the reserved property of missions based on stored mission IDs
          state.missions = state.missions.map((mission) => ({
            ...mission,
            reserved: state.reservedMissions.includes(mission.mission_id),
          }));
        }
      })
      .addCase(getMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { joinMission, leaveMission } = missionSlice.actions;
export default missionSlice.reducer;
