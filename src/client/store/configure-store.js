// @flow

import {
  applyMiddleware, createStore, combineReducers,
} from 'redux';
import type {
  Dispatch, Action,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import type { PromisedStateType } from './store.types';
import rootReducer from './root.reducer';

const defaultState = {
  session: {
    authenticated: false,
    expiration: 0,
    isLoading: false,
  },
  user: {},
  resume: {
    activeResume: 'kroy760@gmail.com',
  },
};

const configureStore = (initialState: PromisedStateType = defaultState) => {
  const combinedReducers = combineReducers<Object, Action<string>>(rootReducer);
  const middlewares = applyMiddleware(thunk);

  return createStore<PromisedStateType, Action<string>, Dispatch<Action<string>>>(
    combinedReducers,
    initialState,
    composeWithDevTools(middlewares),
  );
};

export default configureStore;
