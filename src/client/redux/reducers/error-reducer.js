import { APP_TYPES } from '../actions/auth-actions';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_TYPES.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
