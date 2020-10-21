import { createSelector } from 'reselect';
import { StateType } from '../../../types/store.types';

export const getUser = createSelector(
  (state: StateType) => state.user,
  (user) => user,
);
