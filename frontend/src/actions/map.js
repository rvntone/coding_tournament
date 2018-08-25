import * as mapActions from './types/map';

export const selectLocationFromMap = coords => {
  return {
    type: mapActions.SELECT_LOCATION_FROM_MAP,
    payload: coords,
  };
};
