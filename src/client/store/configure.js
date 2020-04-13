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
import rootReducer from './reducers/root';

const configureStore = (initialState: State = { session: {} }) => {
  const combinedReducers = combineReducers<Object, Action<string>>(rootReducer);
  const middlewares = applyMiddleware(thunk);

  return createStore<State, Action<string>, Dispatch<Action<string>>>(
    combinedReducers,
    initialState,
    composeWithDevTools(middlewares),
  );
};

export default configureStore;
