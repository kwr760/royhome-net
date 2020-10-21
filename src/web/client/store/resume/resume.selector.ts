import { createSelector } from 'reselect';
import { StateType } from '../../../types/state.types';

export const getResume = createSelector(
  (state: StateType) => state.resume,
  (resume) => resume[resume.email],
);
