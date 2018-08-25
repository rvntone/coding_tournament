import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './event';
import { List } from 'semantic-ui-react';

class EventList extends Component {
  renderEventList() {
    const { listKeys } = this.props;
    return listKeys.map(key => {
      return <Event key={key} index={key} />;
    });
  }
  render() {
    return <List>{this.renderEventList()}</List>;
  }
}

const mapStateToProps = state => {
  const { events } = state;
  const { list = [] } = events;
  return { listKeys: Object.keys(list) };
};
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(EventList);
