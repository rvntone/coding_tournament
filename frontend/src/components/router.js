import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../store';
import ReduxTestPage from './reduxTestPage';
import TestingMap from './poc/testingMap';
import Home from './home';

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/poc/maptest" exact component={TestingMap} />
          <Route path="/redux/test" exact>
            <ReduxTestPage />
          </Route>
          <Route component={Home} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
export default Router;
