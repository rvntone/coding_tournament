import * as eventsActions from './types/events';
import actionCreator from '../services/api/actionCreator';

import { eventTypes } from '../components/events/eventTypes';

export const saveEvent = ({
  description,
  eventDatetime,
  type,
  location,
  photo,
}) => {
  const [lng, lat] = location.trim().split(',');
  //GeoJSON format
  const data = {
    type: 'Feature',
    properties: {
      scalerank: 2,
      name: eventTypes[type].title,
      comment: description,
      name_alt: null,
      lat_y: lat.trim(),
      long_x: lng.trim(),
      region: null,
      subregion: null,
      featureclass: eventTypes[type].title,
      eventDatetime,
      photo,
    },
    geometry: {
      type: 'Point',
      coordinates: [lng.trim(), lat.trim()],
    },
  };
  const endpoint = '/events';
  const types = [
    eventsActions.SAVE_EVENT_PROCESSING,
    [
      eventsActions.SAVE_EVENT_SUCCESS,
      () => {
        return {
          type: eventsActions.PUSH_EVENT_TO_LIST,
          payload: data,
        };
      },
    ],
    [eventsActions.SAVE_EVENT_FAIL],
  ];
  const method = 'POST';
  return actionCreator({
    endpoint,
    authenticated: false,
    types,
    method,
    data,
  });
};

//TODO: add send zone for filtering
export const fetchEvents = () => {
  const endpoint = '/events';
  const types = [
    eventsActions.FETCH_EVENTS_PROCESSING,
    [eventsActions.FETCH_EVENTS_SUCCESS],
    [eventsActions.FETCH_EVENTS_FAIL],
  ];
  const method = 'GET';
  return actionCreator({
    endpoint,
    authenticated: false,
    types,
    method,
  });
};
