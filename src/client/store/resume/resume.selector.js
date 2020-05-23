// @flow

import { createSelector } from 'reselect';
import type { StateType } from '../store.types';
import type { ResumeStateType } from './resume.types';

export const getResume = createSelector<StateType, mixed, ResumeStateType, ResumeStateType>(
  (state) => state.resume,
  (resume) => resume[resume.activeResume],
);
