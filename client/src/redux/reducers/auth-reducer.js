import { APP_TYPES } from '../actions/auth-actions';

const isEmpty = require('is-empty');

const appReducerInitState = {};

export default function appReducer(state = appReducerInitState, action) {
  switch (action.type) {
    case APP_TYPES.USER_LOADING:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case APP_TYPES.USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
