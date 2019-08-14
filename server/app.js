import fs from 'fs';
import express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';
import handlebars from 'handlebars';
import bodyParser from 'body-parser';
import session from 'express-session';
import config from './config/default';
import router from './router';
import authRouter from './auth-router';
import Button from 'react-bootstrap/Button';

const MongoSession = require('connect-mongo')(session);

const passport = require('passport');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/new_traider', { useNewUrlParser: true });

const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({
  store: new MongoSession({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    autoRemove: 'interval',
    autoRemoveInterval: 120
  }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 6000000
  }
}));


app.use(passport.initialize());
require('./config/passport')(passport);

const { buildConfig: { assetsDir, targetDir }, server: { port }, proxyAssets } = config;

if (config.appModeDev) {
  app.use(
    `/${assetsDir}`,
    proxy({ target: `http://${proxyAssets.host}:${proxyAssets.port}`, changeOrigin: true }),
  );
} else {
  app.use(
    `/${assetsDir}`,
    express.static(path.join(process.cwd(), targetDir, 'client')),
  );
}

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
  meta: true,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false
}));

app.use('/api', router);
app.use('/api', authRouter);

app.use('*', (req, res) => {
  const template = handlebars.compile(fs.readFileSync(
    path.join(__dirname, 'index.hbs'),
    'utf8',
  ));
  const context = {
    title: 'Express React Skeleton'
  };
  res.send(template(context));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
