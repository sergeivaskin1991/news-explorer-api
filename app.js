const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const limiter = require('./middlewares/limiter');
const inValidUrl = require('./inValidUrl');
const handlerError = require('./middlewares/handlerError');
const loggerPath = require('./middlewares/loggerPath');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const {
  DB_CONN = 'mongodb://localhost:27017/mestodb', PORT = '3000',
} = process.env;

const app = express();

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const whiteList = [
  'https://sergeivaskin1991.github.io',
  'http://sergeivaskin1991.github.io',
  'http://localhost:8081',
  'http://api.vaskin.students.nomoreparties.co',
  'https://api.vaskin.students.nomoreparties.co',
  'http://api.vaskin.students.nomoreparties.co',
  'https://api.vaskin.students.nomoreparties.co'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
  ],
  credentials: true,
};

app.use(loggerPath);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use(cors(corsOptions));
app.use(router);

app.use('*', inValidUrl);
app.use(errorLogger);

app.use(errors());
app.use('/', handlerError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Порт: ${PORT}`);
});
