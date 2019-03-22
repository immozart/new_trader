import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PAGES } from './pages';
import App from '../components/app/app';
import HomePage from '../components/home-page/home-page';

const WrappedApp = (Component, props) => (
  <App>
    <Component { ...props } />
  </App>
);

export default () => (
  <Switch>
    <Route
      exact path={ PAGES.home.path }
      render={ props => WrappedApp(HomePage, props) }
    />
  </Switch>
);
