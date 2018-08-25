import React, { Component } from 'react';

import ReactMapboxGl, {
  Layer,
  Feature,
  ScaleControl,
  ZoomControl,
  Marker,
  RotationControl,
  Popup,
  Cluster,
} from 'react-mapbox-gl';
import { geolocated } from 'react-geolocated';

const clusterData = require('../../testData/cluster.json');

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicnZudG9uZSIsImEiOiJjamhkd2JtM24wcXkyM2RuMjkwbG90aWN6In0.OYaSlILdFzmUSpWrg77Mpg',
});

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

export class TestingMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYouAreHerePopup: false,
      position: null,
      popup: null,
      zoom: 17,
    };
    this.enterYouAreHere = this.enterYouAreHere.bind(this);
    this.leaveYouAreHere = this.leaveYouAreHere.bind(this);
    this.clusterMarker = this.clusterMarker.bind(this);
    this.onClickMap = this.onClickMap.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { coords, isGeolocationAvailable } = props;
    if (!(isGeolocationAvailable && coords)) {
      return {};
    }
    const position = [coords.longitude, coords.latitude];
    return {
      position,
    };
  }
  clusterMarker(coordinates, pointCount) {
    return (
      <Marker coordinates={coordinates} style={styles.clusterMarker}>
        <div>{pointCount}</div>
      </Marker>
    );
  }
  onClickMap(event, mapWithEvt) {
    console.log(event, mapWithEvt);
    const { lngLat } = mapWithEvt;
    alert(`click on ${lngLat.lng} ${lngLat.lat}`);
  }

  getPosition(mapWithEvt) {
    const { lngLat } = mapWithEvt;
    return [lngLat.lng, lngLat.lat];
  }
  enterYouAreHere(mapWithEvt) {
    const position = this.getPosition(mapWithEvt);
    this.setState({
      showYouAreHerePopup: true,
      position,
    });
  }
  leaveYouAreHere() {
    this.setState({
      showYouAreHerePopup: false,
    });
  }
  renderWhereYouArePopup() {
    const { showYouAreHerePopup, position } = this.state;
    if (!showYouAreHerePopup || !position) {
      return null;
    }
    return (
      <Popup
        coordinates={position}
        offset={{
          bottom: [0, -10],
        }}
      >
        <h1>You are here</h1>
      </Popup>
    );
  }
  renderWhereYouAre() {
    const { coords, isGeolocationAvailable } = this.props;
    if (!(isGeolocationAvailable && coords)) {
      return null;
    }
    const center = [coords.longitude, coords.latitude];
    return (
      <Feature
        coordinates={center}
        onClick={() => {
          alert('You are here');
        }}
        onMouseEnter={this.enterYouAreHere}
        onMouseLeave={this.leaveYouAreHere}
      >
        <Marker coordinates={center} />
      </Feature>
    );
  }
  renderLeavesPopup() {
    const { popup } = this.state;
    if (!popup) {
      return null;
    }
    return (
      <Popup offset={[0, -50]} coordinates={popup.coordinates}>
        <div
          style={{
            background: 'white',
            color: '#3f618c',
            fontWeight: 400,
            padding: 5,
            borderRadius: 2,
          }}
        >
          {popup.leaves.map((leaf, index) => (
            <div key={index}>{leaf.props['data-feature'].properties.name}</div>
          ))}
          {popup.total > popup.leaves.length ? <div>And more...</div> : null}
        </div>
      </Popup>
    );
  }
  render() {
    const { coords, isGeolocationAvailable } = this.props;
    let center = [-78.480968, -0.176323];
    const zoom = [this.state.zoom];
    if (!(isGeolocationAvailable && coords)) {
      return null;
    }
    if (isGeolocationAvailable && coords) {
      center = [coords.longitude, coords.latitude];
    }
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        center={center}
        zoom={zoom}
        onClick={this.onClickMap}
      >
        <ScaleControl />
        <ZoomControl />
        <RotationControl />
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          {this.renderWhereYouAre()}
        </Layer>
        {this.renderWhereYouArePopup()}
        <Cluster ClusterMarkerFactory={this.clusterMarker} zoomOnClick={true}>
          {clusterData.features.map((feature, key) => (
            <Marker
              key={key}
              coordinates={feature.geometry.coordinates}
              data-feature={feature}
              style={styles.marker}
            >
              <div title={feature.properties.name}>
                {feature.properties.name[0]}
              </div>
            </Marker>
          ))}
        </Cluster>
        {this.renderLeavesPopup()}
      </Map>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(TestingMap);
