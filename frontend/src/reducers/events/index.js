import { combineReducers } from 'redux';

import locationFromMapReducer from './locationFromMap';
import listReducer from './list';
import eventTypefilterReducer from './eventTypefilter';

const reducers = {
  locationFromMap: locationFromMapReducer,
  list: listReducer,
  eventTypefilter: eventTypefilterReducer,
};

export default combineReducers(reducers);
