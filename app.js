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
  'https://sergeivaskin.github.io',
  'http://sergeivaskin.github.io',
  'http://localhost:8081',
  'http://api.vaskin.students.nomoreparties.co',
  'https://api.vaskin.students.nomoreparties.co',
  'http://vaskin.students.nomoreparties.co',
  'https://vaskin.students.nomoreparties.co'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
