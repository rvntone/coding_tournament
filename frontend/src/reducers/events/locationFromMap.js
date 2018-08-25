import createReducer from '../createReducer';
import * as mapActions from '../../actions/types/map';

const INITIAL_STATE = {};

export default createReducer(INITIAL_STATE, {
  [mapActions.SELECT_LOCATION_FROM_MAP](state, action) {
    return { ...action.payload };
  },
});
