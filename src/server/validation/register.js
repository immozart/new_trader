/* eslint-disable no-param-reassign */
const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegistration(data) {
  const errors = { errors: {} };

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (validator.isEmpty(data.firstName)) {
    errors.errors.firstName = 'Введите, пожалуйста, ваше Имя.';
  }

  if (validator.isEmpty(data.email)) {
    errors.errors.email = 'Введите, пожалуйста, вашу Электронную почту.';
  } else if (!validator.isEmail(data.email)) {
    errors.errors.email = 'Введите, пожалуйста, вашу Электронную почту.';
  }

  if (validator.isEmpty(data.password)) {
    errors.errors.password = 'Введите, пожалуйста, ваш Пароль.';
  }

  if (!validator.isLength(data.password, { min: 1, max: 10 })) {
    errors.errors.password = 'Пароль должен иметь от 1 до 10 символов.';
  }

  return {
    errors,
    isValid: isEmpty(errors.errors)
  };
};
