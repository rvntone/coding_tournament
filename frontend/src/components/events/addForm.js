import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Accordion } from 'semantic-ui-react';
import InputMoment from 'input-moment';
import moment from 'moment';
import { geolocated } from 'react-geolocated';

import { selectLocationFromMap } from '../../actions/map';

import 'input-moment/dist/input-moment.css';
import './addForm.scss';

import EventTypes from './eventTypes';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      eventType: null,
      dateTimeEvent: moment(),
      location: '',
      oldLocation: '',
      photo: null,
      activeIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.onChooseButton = this.onChooseButton.bind(this);
    this.onChooseFile = this.onChooseFile.bind(this);
    this.onChangeEventType = this.onChangeEventType.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    const { locationFromMap } = props;
    if (!locationFromMap) {
      return {};
    }
    const { oldLocation } = state;
    const location =
      locationFromMap.lng === undefined
        ? ''
        : `${locationFromMap.lng},  ${locationFromMap.lat}`;
    if (location !== state.location) {
      if (location !== oldLocation) {
        return { location, oldLocation: location };
      }
      return { location: state.location, oldLocation: state.location };
    }
    return {};
  }
  handleChange(dateTimeEvent) {
    if (dateTimeEvent > moment()) {
      this.setState({ dateTimeEvent: moment() });
      return;
    }
    this.setState({ dateTimeEvent });
  }
  onChooseFile(event, data) {
    this.setState({
      photo: event.target.files[0],
    });
  }
  onChangeLocation(coords) {
    this.setState({
      location: `${coords.longitude},  ${coords.latitude}`,
    });
  }
  setCurrentLocation() {
    const { coords } = this.props;
    this.setState({
      location: `${coords.longitude},  ${coords.latitude}`,
    });
  }
  onChooseButton() {
    this.upload.click();
  }
  onChangeEventType(value) {
    this.setState({
      eventType: value,
    });
  }
  onChangeDescription(event, data) {
    this.setState({
      description: data.value,
    });
  }
  onSendClick() {
    alert('sent');
  }
  handleClick(event, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }
  renderAccordionItem(title, content, index) {
    const { activeIndex } = this.state;
    return (
      <React.Fragment>
        <Accordion.Title
          index={index}
          active={activeIndex === index}
          onClick={this.handleClick}
        >
          {title}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index} content={content} />
      </React.Fragment>
    );
  }
  renderDescription() {
    const { description } = this.state;
    const title = 'Descripción del evento';
    const content = (
      <Form.TextArea
        placeholder="Aquí puedes escribir todos los detalles del evento"
        value={description}
        onChange={this.onChangeDescription}
      />
    );
    return this.renderAccordionItem(title, content, 0);
  }
  renderEventType() {
    const { eventType } = this.state;
    const title = 'Evento';
    const content = (
      <EventTypes value={eventType} onChange={this.onChangeEventType} />
    );
    return this.renderAccordionItem(title, content, 1);
  }
  renderDateTime() {
    const { dateTimeEvent } = this.state;
    const title = 'Fecha y hora';
    const content = (
      <InputMoment
        moment={dateTimeEvent}
        onChange={this.handleChange}
        minStep={1} // default
        hourStep={1} // default
        prevMonthIcon="ion-ios-arrow-left" // default
        nextMonthIcon="ion-ios-arrow-right" // default
      />
    );
    return this.renderAccordionItem(title, content, 2);
  }
  renderLocation() {
    const { location } = this.state;
    const title = 'Lugar';
    const content = (
      <Input
        value={location}
        fluid
        action={{
          color: 'teal',
          labelPosition: 'left',
          icon: 'pin',
          content: 'Aquí',
          onClick: this.setCurrentLocation,
        }}
        placeholder=""
      />
    );
    return this.renderAccordionItem(title, content, 3);
  }
  renderFoto() {
    const { photo } = this.state;
    const title = 'Foto';
    const content = (
      <React.Fragment>
        <input
          id="fileInput"
          type="file"
          accept="*/*"
          ref={ref => (this.upload = ref)}
          style={{ display: 'none' }}
          onChange={this.onChooseFile}
        />
        <Button color="teal" onClick={this.onChooseButton}>
          <Button.Content visible className="uploadButton">
            {photo ? `${photo.name}` : 'Elegir foto'}
          </Button.Content>
        </Button>
      </React.Fragment>
    );
    return this.renderAccordionItem(title, content, 4);
  }
  rederSendButton() {
    const { description, location, eventType, photo } = this.state;
    const disabled =
      description.trim() === '' ||
      eventType === null ||
      location.trim() === '' ||
      photo === null;

    return (
      <div className="sendEventButtonContainer">
        <Button onClick={this.onSendClick} disabled={disabled}>
          Crear
        </Button>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Form className="addForm">
          <Accordion className="container">
            {this.renderDescription()}
            {this.renderEventType()}
            {this.renderDateTime()}
            {this.renderLocation()}
            {this.renderFoto()}
          </Accordion>
        </Form>
        {this.rederSendButton()}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { events = {} } = state;
  const { locationFromMap } = events;
  return { locationFromMap };
};
const mapActionsToProps = {
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
    mapActionsToProps,
  )(AddForm),
);
