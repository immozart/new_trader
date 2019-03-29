import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PAGES } from './pages';
import App from '../components/app/app';
import HomePage from '../components/home-page/home-page';
import Login from '../components/login/login';
import Registration from '../components/registration/registration';
import Page404 from '../components/page404/page404';
import Journal from '../components/journal';
import Statistic from '../components/statistics';
import Settings from '../components/settings';


const WrappedApp = (Component, props) => (
  <App>
    <Component {...props} />
  </App>
);

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (auth.isAuthenticated === true ? (
//         <Component {...props} />
//     ) : (
//           <Redirect to="/login" />
//     ))
//     }
//   />
// );

export default () => (
  <Switch>
    <Route
      exact path={PAGES.home.path}
      render={props => WrappedApp(HomePage, props)}
    />
    <Route
      exact path={PAGES.login.path}
      render={props => WrappedApp(Login, props)}
    />
    <Route
      exact path={PAGES.registration.path}
      render={props => WrappedApp(Registration, props)}
    />
    <Route
      exact path={PAGES.statistic.path}
      render={props => WrappedApp(Statistic, props)}
    />
    <Route
      exact path={PAGES.journal.path}
      render={props => WrappedApp(Journal, props)}
    />
    <Route
      exact path={PAGES.settings.path}
      render={props => WrappedApp(Settings, props)}
    />
    <Route
      exact path={PAGES.page404.path}
      render={props => WrappedApp(Page404, props)}
    />
  </Switch>
);
