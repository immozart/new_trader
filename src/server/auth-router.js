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

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  }
  return res.status(400).json({ email: 'Сессии нет.' });
});

router.post('/', (req, res) => {
  req.session.destroy();
  res.status(200);
});


router.post('/registration', (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { firstName, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Пользователь с такой почтой уже существует в системе.' });
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
      .then((user) => {
        req.session.user = user;
        res.json(user);
      })
      .catch(err => console.log(err));
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ email: 'Пользователь с такой почтой не найден в системе.' });
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            req.session.user = user;
            console.log(req.session.user);
            return res.json(user);
          }
          return res.status(400).json({ password: 'Вы ввели некорректный пароль' });
        });
    });
});

export default router;
