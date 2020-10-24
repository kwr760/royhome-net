import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStateType } from '../../../types/state.types';
import { DarkModes } from './session.constants';

const initialState: SessionStateType = {
  authenticated: false,
  expiration: 0,
  isLoading: false,
  darkMode: DarkModes.CLEAR_MODE,
} as SessionStateType;

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateAuthentication: (
      state,
      action: PayloadAction<{ authenticated: boolean, expiration: number }>,
    ) => {
      state.authenticated = action.payload.authenticated;
      state.expiration = action.payload.expiration;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateDarkMode: (state, action: PayloadAction<string>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { updateAuthentication, updateLoading, updateDarkMode, setLoading, clearLoading } = sessionSlice.actions;
export default sessionSlice.reducer;
