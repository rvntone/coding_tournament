import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../store';
import Home from './home';
import TestingMap from './poc/testingMap';

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/poc/maptest" exact component={TestingMap} />
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </ConnectedRouter>
    );
  }
}
export default Router;
