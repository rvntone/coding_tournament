import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';

class Event extends Component {
  render() {
    const { event } = this.props;
    const { properties } = event;
    console.log(event);
    return (
      <List.Item>
        <List.Content>
          <List.Header>{properties.name}</List.Header>
          {properties.comment}
        </List.Content>
      </List.Item>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { events } = state;
  const { list = [] } = events;
  return { event: list[props.index] };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);
