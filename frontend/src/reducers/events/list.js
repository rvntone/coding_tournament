import createReducer from '../createReducer';
import * as eventsActions from '../../actions/types/events';

const INITIAL_STATE = [];

export default createReducer(INITIAL_STATE, {
  [eventsActions.FETCH_EVENTS_SUCCESS](state, action) {
    return [...action.response];
  },
  [eventsActions.PUSH_EVENT_TO_LIST](state, action) {
    return [...state, action.payload];
  },
});
