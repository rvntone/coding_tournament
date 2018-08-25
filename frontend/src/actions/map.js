import * as mapActions from './types/map';

export const selectLocationFromMap = coords => {
  return {
    type: mapActions.SELECT_LOCATION_FROM_MAP,
    payload: coords,
  };
};

export const setEventTypeFilter = filter => {
  return {
    type: mapActions.SET_EVENT_TYPE_FILTER,
    payload: filter,
  };
};

export const clearEventTypeFilter = () => {
  return {
    type: mapActions.CLEAR_EVENT_TYPE_FILTER,
  };
};
