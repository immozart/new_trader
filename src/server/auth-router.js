/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const keys = {
  mongoURI: 'YOUR_MONGOURI_HERE',
  secretOrKey: 'secret'
};

const User = require('./models/users');

const validateRegistration = require('./validation/register');
const validateLogin = require('./validation/login');


router.post('/registration', (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.json(errors);
  }

  const { firstName, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.json({ errors: { email: 'Пользователь с такой почтой уже существует в системе.' } });
      }
    });

  const newUser = new User({
    firstName,
    email,
    password
  });

  // Hash password before saving in database
  bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  console.log(errors);

  if (!isValid) {
    return res.json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({ errors: { email: 'Пользователь с такой почтой не найден в системе.' } });
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = { id: user.id, firstName: user.firstName };
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926
              },
              (err, token) => {
                res.json({ success: true, token: `Bearer${token}` });
              }
            );
          } else {
            return res.json({ errors: { password: 'Вы ввели некорректный пароль' } });
          }
        });
    });
});

export default router;
