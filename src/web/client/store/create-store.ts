import { configureStore, Action, Store } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import env from '../../../config';
import rootReducer, { RootState } from './root.reducer';

const createStore = (preloadedState = {}): Store => {
  const reducer = rootReducer;

  return configureStore({
    reducer,
    preloadedState,
    devTools: env.mode === 'dev',
  });
};

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default createStore;

