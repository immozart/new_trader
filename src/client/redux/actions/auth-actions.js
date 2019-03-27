import axios from 'axios';


//  ACTION TYPES
export const APP_TYPES = {
  GET_ERRORS: 'GET_ERRORS',
  USER_LOADING: 'USER_LOADING',
  USER_LOGOUT: 'USER_LOGOUT'
};

// ACTION CREATORS

export const getErrorsAC = () => ({
  type: APP_TYPES.GET_ERRORS
});

export const authUserAC = userData => (dispatch) => {
  axios
    .post('http://localhost:3000/api/registration', userData)
    .then(res => dispatch({
      type: APP_TYPES.USER_LOADING,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: APP_TYPES.GET_ERRORS,
      payload: err.response.data
    }));
};

export const loginUserAC = userData => (dispatch) => {
  axios
    .post('http://localhost:3000/api/login', userData)
    .then(res => dispatch({
      type: APP_TYPES.USER_LOADING,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: APP_TYPES.GET_ERRORS,
      payload: err.response.data
    }));
};

export const logoutUserAC = () => (dispatch) => {
  axios.post('http://localhost:3000/api');
  dispatch({
    type: APP_TYPES.USER_LOADING,
    payload: {}
  });
};
