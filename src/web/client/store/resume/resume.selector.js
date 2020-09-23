// @flow

import { createSelector } from 'reselect';
import type { StateType } from '../store.types';
import type { ResumeType, ResumeStateType } from './resume.types';

export const getResume = createSelector<StateType, mixed, ResumeType, ResumeStateType>(
  (state) => state.resume,
  (resume) => resume[resume.activeResume],
);
