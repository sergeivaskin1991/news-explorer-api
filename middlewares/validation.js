const { celebrate, Joi } = require('celebrate');
const validUrl = require('./validUrl');
const {
  ID,
  DATE,
  EMAIL,
  EMPTY_FIELD,
  KEYWORD,
  NAME,
  PASSWORD_SIGNUP,
  PASSWORD,
  SOURCE,
  TEXT,
  TITLE,
} = require('../errors/messageError');

Joi.objectId = require('joi-objectid')(Joi);

// Валидация запросов
const idValid = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId()
      .error(new Error(ID)),
  }),
});

const createArticleValid = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim()
      .error(new Error(`${EMPTY_FIELD}${KEYWORD}`)),
    title: Joi.string().required().trim()
      .error(new Error(`${EMPTY_FIELD}${TITLE}`)),
    text: Joi.string().required().trim()
      .error(new Error(`${EMPTY_FIELD}${TEXT}`)),
    date: Joi.string().required().trim()
      .error(new Error(`${EMPTY_FIELD}${DATE}`)),
    source: Joi.string().required().trim()
      .error(new Error(`${EMPTY_FIELD}${SOURCE}`)),
    link: Joi.required().custom((v) => validUrl(v)),
    image: Joi.required().custom((v) => validUrl(v)),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(new Error(NAME)),
    email: Joi.string().required().email()
      .error(new Error(EMAIL)),
    password: Joi.string().pattern(
      new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!&$%#? "])(?=\\S+$).*$'),
    ).error(new Error(PASSWORD_SIGNUP)),
    repeat_password: Joi.ref('password'),
  }),
});

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Error(EMAIL)),
    password: Joi.string().required().min(8)
      .error(new Error(PASSWORD)),
  }),
});

module.exports = {
  idValid,
  createArticleValid,
  createUserValid,
  loginValid,
};
