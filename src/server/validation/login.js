/* eslint-disable no-param-reassign */
const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
  const errors = { errors: {} };

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (validator.isEmpty(data.email)) {
    errors.errors.email = 'Введите, пожалуйста, вашу Электронную почту.';
  } else if (!validator.isEmail(data.email)) {
    errors.errors.email = 'Введите, пожалуйста, вашу Электронную почту.';
  }

  if (validator.isEmpty(data.password)) {
    errors.errors.password = 'Введите, пожалуйста, ваш Пароль.';
  }

  return {
    errors,
    isValid: isEmpty(errors.errors)
  };
};
