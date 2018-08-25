import React, { Component } from 'react';

import Layout from './layout';
import Map from './map';

export default class Home extends Component {
  render() {
    return (
      <Layout>
        <Map />
      </Layout>
    );
  }
}
