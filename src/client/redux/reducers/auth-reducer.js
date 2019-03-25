import { APP_TYPES } from '../actions/auth-actions';

const isEmpty = require('is-empty');

const appReducerInitState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function appReducer(state = appReducerInitState, action) {
  switch (action.type) {
    case APP_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case APP_TYPES.USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
