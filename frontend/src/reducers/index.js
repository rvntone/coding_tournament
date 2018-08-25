import { combineReducers } from 'redux';

import userReducer from './user';
import eventsReducer from './events';

const reducers = {
  user: userReducer,
  events: eventsReducer,
};

const createReducers = () => {
  return combineReducers(reducers);
};

const rootReducer = (state, action) => {
  const internalReducers = createReducers();

  return internalReducers(state, action);
};

export { createReducers };

export default rootReducer;
