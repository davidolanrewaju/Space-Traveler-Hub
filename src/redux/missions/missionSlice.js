import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  missions: [],
  isLoading: false,
  error: null,
};

const url = 'https://api.spacexdata.com/v3/missions';

export const getMissions = createAsyncThunk('missions/getMissions', async (_, thunkAPI) => {
  try {
    const response = await axios.get(url);
    const missionArray = (response.data).map((mission) => mission);
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
      const newState = { ...state };
      newState.missions = state.missions.map((mission) => {
        if (mission.mission_id !== missionId) {
          return mission;
        }
        return { ...mission, reserved: true };
      });
      return newState;
    },
    leaveMission: (state, action) => {
      const missionId = action.payload;
      const newState = { ...state };
      newState.missions = state.missions.map((mission) => {
        if (mission.mission_id !== missionId) {
          return mission;
        }
        return { ...mission, reserved: false };
      });
      return newState;
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
      })
      .addCase(getMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { joinMission, leaveMission } = missionSlice.actions;
export default missionSlice.reducer;
