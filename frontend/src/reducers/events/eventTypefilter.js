import createReducer from '../createReducer';
import * as mapActions from '../../actions/types/map';

const INITIAL_STATE = false;

export default createReducer(INITIAL_STATE, {
  [mapActions.SET_EVENT_TYPE_FILTER](state, action) {
    return action.payload;
  },
  [mapActions.CLEAR_EVENT_TYPE_FILTER](state, action) {
    return false;
  },
});
