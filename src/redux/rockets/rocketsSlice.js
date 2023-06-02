import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRockets = createAsyncThunk(
  'rockets/getRockets',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/rockets');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'Error connecting to the API' });
    }
  },
);

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: {
    rockets: [],
    isLoading: false,
    error: '',
  },
  reducers: {
    reserveRocket: (state, action) => {
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id !== action.payload) {
          return rocket;
        }
        return { ...rocket, reserved: !rocket.reserved };
      });
      return ({
        ...state,
        rockets: newRockets,
      });
    },
    cancelReserve: (state, action) => {
      const newRockets = action.payload;
      state.rockets = state.rockets.map((rocket) => (
        rocket.id !== newRockets ? rocket : { ...rocket, reserved: false }
      ));
      return ({
        ...state,
        rockets: newRockets,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRockets.fulfilled, (state, action) => {
      const rocketList = action.payload.map((rocket) => ({
        id: rocket.id,
        rocket_name: rocket.name,
        description: rocket.description,
        flickr_images: [...rocket.flickr_images],
      }));
      return ({
        ...state,
        isLoading: false,
        rockets: rocketList,
      });
    })
      .addCase(getRockets.pending, (state) => ({
        ...state,
        isLoading: true,
        error: '',
      }))
      .addCase(getRockets.rejected, (state, action) => ({
        ...state,
        error: action.payload.error,
        isLoading: false,
      }));
  },
});

export const { reserveRocket, cancelReserve } = rocketsSlice.actions;
export default rocketsSlice.reducer;
