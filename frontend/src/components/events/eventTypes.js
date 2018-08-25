import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import './eventTypes.scss';

const eventTypes = [
  {
    title: 'Asalto',
    value: 0,
    icono: 'spy',
  },
  {
    title: 'Robo',
    value: 1,
    icono: 'hand lizard outline',
  },
];

export default class EventTypes extends Component {
  onChangeValue(value) {
    const { onChange = () => {} } = this.props;
    onChange(value);
  }
  renderTypes() {
    const { value } = this.props;
    return eventTypes.map(eventType => {
      const className = `eventContainer ${
        value === eventType.value ? 'selected' : ''
      }`;
      return (
        <div
          key={`event_${eventType.value}`}
          className={className}
          onClick={this.onChangeValue.bind(this, eventType.value)}
        >
          <Icon name={eventType.icono} />
          {eventType.title}
        </div>
      );
    });
  }
  render() {
    return <div className="eventTypeListPicker">{this.renderTypes()}</div>;
  }
}
