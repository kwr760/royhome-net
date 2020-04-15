// @flow

import {
  applyMiddleware, createStore, combineReducers,
} from 'redux';
import type {
  Dispatch, Action,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { type State } from './types';
import rootReducer from './root.reducer';

const defaultState = {
  session: {
    authenticated: false,
    expiration: 0,
  },
};

const configureStore = (initialState: State = defaultState) => {
  const combinedReducers = combineReducers<Object, Action<string>>(rootReducer);
  const middlewares = applyMiddleware(thunk);

  return createStore<State, Action<string>, Dispatch<Action<string>>>(
    combinedReducers,
    initialState,
    composeWithDevTools(middlewares),
  );
};

export default configureStore;
