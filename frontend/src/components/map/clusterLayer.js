import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, Cluster } from 'react-mapbox-gl';

import { fetchEvents } from '../../actions/events';
import { eventTypes } from '../events/eventTypes';

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    cursor: 'pointer',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9',
  },
};

class ClusterLayer extends Component {
  constructor(props) {
    super(props);
    this.clusterMarker = this.clusterMarker.bind(this);
  }
  componentDidMount() {
    this.props.fetchEvents();
  }
  clusterMarker(coordinates, pointCount) {
    return (
      <Marker coordinates={coordinates} style={styles.clusterMarker}>
        <div>{pointCount}</div>
      </Marker>
    );
  }
  render() {
    const { clusterData = [] } = this.props;
    return (
      <Cluster ClusterMarkerFactory={this.clusterMarker} zoomOnClick={true}>
        {clusterData.map((feature, key) => (
          <Marker
            key={key}
            coordinates={feature.geometry.coordinates}
            data-feature={feature}
            style={styles.marker}
          >
            <div title={feature.properties.comment}>
              {feature.properties.name}
            </div>
          </Marker>
        ))}
      </Cluster>
    );
  }
}
const filterList = (list, eventTypefilter) => {
  if (eventTypefilter === false) {
    return list;
  }
  return list.filter(event => {
    return event.properties.name === eventTypes[eventTypefilter].title;
  });
};
const mapStateToProps = state => {
  const { events } = state;
  const { list = [], eventTypefilter } = events;
  const eventList = filterList(list, eventTypefilter);
  return { clusterData: eventList };
};

const mapDispatchToProps = { fetchEvents };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClusterLayer);
