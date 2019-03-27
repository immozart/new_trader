import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { setCurrentUserAC, logoutUserAC } from './redux/actions/auth-actions';
import setAuthToken from './utils/setAuthToken';
import reducers from './redux/reducers';
import Routes from './routes/routes';
import rootSaga from './redux/sagas';

const history = createBrowserHistory();
const composeEnhancers = composeWithDevTools({});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const initialState = {
  app: {
    name: 'Express React Skeleton',
    say: 'nothing for now'
  },
  auth: {}
};

const store = createStore(
  reducers(history),
  initialState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      sagaMiddleware
    )
  )
);

// console.log(localStorage)
// // Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwtDecode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUserAC(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUserAC());
//     // Redirect to login
//     window.location.href = './login';
//   }
// }
// console.log(localStorage)

// then run the saga
sagaMiddleware.run(rootSaga);

const Index = () => (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('react-app'));
