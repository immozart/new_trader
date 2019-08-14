import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import errorReducer from './error-reducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  auth: authReducer,
  errors: errorReducer
});

export default reducers;
