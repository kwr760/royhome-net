import { configureStore, Action, Store } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import env from '../../../config';
import rootReducer, { RootState } from './root.reducer';

const createStore = (preloadedState = undefined): Store => {
  const reducer = rootReducer;

  return configureStore({
    reducer,
    preloadedState,
    devTools: env.mode === 'development',
  });
};

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default createStore;

