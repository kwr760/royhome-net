import {
  applyMiddleware, createStore, combineReducers, Store,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { StateType } from '../../types/state.types';

import rootReducer from './root.reducer';
import { DarkModes } from './session/session.constants';

const defaultState = {
  session: {
    authenticated: false,
    expiration: 0,
    isLoading: false,
    darkMode: DarkModes.CLEAR_MODE,
  },
  user: {},
  resume: {
    email: 'kroy760@gmail.com',
  },
};

const configureStore = (initialState: StateType = defaultState): Store => {
  const combinedReducers = combineReducers(rootReducer);
  const middlewares = applyMiddleware(thunk);

  return createStore(
    combinedReducers,
    initialState,
    composeWithDevTools(middlewares),
  );
};

export default configureStore;
