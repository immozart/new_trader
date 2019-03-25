import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './app-reducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  app: appReducer
});

export default reducers;
