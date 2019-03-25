import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';


//  ACTION TYPES
export const APP_TYPES = {
  GET_ERRORS: 'GET_ERRORS',
  USER_LOADING: 'USER_LOADING',
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

// ACTION CREATORS

export const getErrorsAC = () => ({
  type: APP_TYPES.GET_ERRORS
});

export const registerUserAC = (userData, history) => (dispatch) => {
  axios
    .post('http://localhost:3000/api/registration', userData)
    .then(() => history.push('/login')) // redirect to login
    .catch(err => dispatch({
      type: APP_TYPES.GET_ERRORS,
      payload: err.response.data
    }));
};

export const setCurrentUserAC = decoded => ({
  type: APP_TYPES.USER_LOADING,
  payload: decoded
});

export const loginUserAC = userData => dispatch => () => {
  axios
    .post('http://localhost:3000/api/registration', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUserAC(decoded));
    })
    .catch(err => dispatch({
      type: APP_TYPES.GET_ERRORS,
      payload: err.response.data
    }));
};

export const setUserLoadingAC = () => ({
  type: APP_TYPES.USER_LOADING
});

export const logoutUserAC = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUserAC({}));
};
