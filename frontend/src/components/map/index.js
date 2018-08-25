import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, {
  Layer,
  Feature,
  ScaleControl,
  ZoomControl,
  Marker,
  RotationControl,
  Popup,
} from 'react-mapbox-gl';
import { geolocated } from 'react-geolocated';
import { Dimmer, Loader } from 'semantic-ui-react';

import { selectLocationFromMap } from '../../actions/map';

const MapboxGl = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicnZudG9uZSIsImEiOiJjamhkd2JtM24wcXkyM2RuMjkwbG90aWN6In0.OYaSlILdFzmUSpWrg77Mpg',
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYouAreHerePopup: false,
      position: null,
      zoom: 17,
    };
    this.enterYouAreHere = this.enterYouAreHere.bind(this);
    this.leaveYouAreHere = this.leaveYouAreHere.bind(this);
    this.onClickMap = this.onClickMap.bind(this);
  }
  static getDerivedStateFromProps(props) {
    const { coords, isGeolocationAvailable } = props;
    if (!(isGeolocationAvailable && coords)) {
      return {};
    }
    const position = [coords.longitude, coords.latitude];
    return {
      position,
    };
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
  onClickMap(event, mapWithEvt) {
    const { lngLat } = mapWithEvt;
    this.props.selectLocationFromMap(lngLat);
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
  render() {
    const { coords, isGeolocationAvailable } = this.props;
    let center = [-78.480968, -0.176323];
    const zoom = [this.state.zoom];
    if (!(isGeolocationAvailable && coords)) {
      return (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      );
    }
    if (isGeolocationAvailable && coords) {
      center = [coords.longitude, coords.latitude];
    }
    return (
      <MapboxGl
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: 'calc(100vh - 54px)',
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
      </MapboxGl>
    );
  }
}
const mapStateToProps = () => ({});
const mapActionToProps = {
  selectLocationFromMap,
};
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(Map),
);
