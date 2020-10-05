const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/authorisation-err');
const { AUTH } = require('../errors/messageError');
require('dotenv').config();

// Авторизация
module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AuthorisationError(AUTH);
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;

    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-strong-secret');
  } catch (err) {
    throw new AuthorisationError(AUTH);
  }

  req.user = payload;

  next();
};
