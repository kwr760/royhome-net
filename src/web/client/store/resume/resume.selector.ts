import { createSelector } from 'reselect';
import { ResumeStateType, StateType } from '../../../types/state.types';

export const getResume = createSelector(
  (state: StateType) => state.resume,
  (resume: ResumeStateType) => resume.resumes[resume.email],
);
