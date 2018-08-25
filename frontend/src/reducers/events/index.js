import { combineReducers } from 'redux';

import locationFromMapReducer from './locationFromMap';
import listReducer from './list';

const reducers = {
  locationFromMap: locationFromMapReducer,
  list: listReducer,
};

export default combineReducers(reducers);
