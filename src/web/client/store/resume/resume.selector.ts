import { createSelector } from 'reselect';
import { StateType } from '../../../types/store.types';

export const getResume = createSelector(
  (state: StateType) => state.resume,
  (resume) => resume[resume.email],
);
