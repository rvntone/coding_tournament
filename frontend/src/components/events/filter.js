import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventTypes from './eventTypes';
import { setEventTypeFilter, clearEventTypeFilter } from '../../actions/map';
import { Button } from 'semantic-ui-react';
class FilterList extends Component {
  constructor(props) {
    super(props);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }
  clearFilter() {
    this.props.clearEventTypeFilter();
  }
  onChangeFilter(value) {
    this.props.setEventTypeFilter(value);
  }
  render() {
    const { value = 0 } = this.props;
    return (
      <div>
        <Button onClick={this.clearFilter}>Mostrar todos</Button>
        <EventTypes value={value} onChange={this.onChangeFilter} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { events } = state;
  const { eventTypefilter } = events;
  return { value: eventTypefilter };
};

const mapDispatchToProps = { setEventTypeFilter, clearEventTypeFilter };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterList);
