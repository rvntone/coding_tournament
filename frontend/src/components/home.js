import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Container, Message } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import { userTest } from '../actions/user';
class Home extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  componentDidMount() {
    this.props.userTest();
  }

  render() {
    const { user } = this.props;
    const hasStore = user.load;
    return (
      <Container>
        HOME {hasStore ? 'has store' : 'ops there is a problem with the store'}
        <Button>Click Here</Button>
        <Icon disabled name="users" />
        <Message warning>
          <Message.Header>Changes in Service</Message.Header>
          <p>
            We updated our privacy policy here to better service our customers.
            We recommend reviewing the changes.
          </p>
        </Message>
        <Card>
          <Card.Content header="About Amy" />
          <Card.Content description={'dsadsadsad'} />
          <Card.Content extra>
            <Icon name="user" />4 Friends
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = {
  userTest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
