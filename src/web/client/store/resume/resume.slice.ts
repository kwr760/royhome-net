import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeActionType } from '../../../types/action.types';
import { ResumeStateType } from '../../../types/state.types';
import { callApi } from '../../util/api/call-api';
import { ApiConfigs } from '../../util/api/api.config';
import { setLoading, clearLoading } from '../session/session.slice';
import { AppThunk } from '../create-store';

const initialState: ResumeStateType = {
  email: 'kroy760@gmail.com',
  resumes: {},
} as ResumeStateType;

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    getResumeSuccess: (state: ResumeStateType, action: PayloadAction<ResumeActionType>) => {
      const { resume } = action.payload;
      const { email = 'unknown'} = resume && resume.contact || {};
      state.email = email;
      state.resumes = {
        [email]: resume,
      };
    },
    getResumeFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// dispatch(fetchResume(email))
export const fetchResume = (email: string): AppThunk => async dispatch => {
  const { getResumeSuccess, getResumeFailure } = resumeSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.GET_RESUME, {
      params: {
        email,
      },
    });
    dispatch(clearLoading());
    dispatch(getResumeSuccess(response.data));
  } catch (err) {
    dispatch(clearLoading());
    dispatch(getResumeFailure(err.toString()));
  }
};

export default resumeSlice.reducer;
