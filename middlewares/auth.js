const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { AUTH } = require('../errors/messageError');
require('dotenv').config();

// Авторизация
module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(AUTH);
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;

    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-strong-secret');
  } catch (err) {
    throw new UnauthorizedError(AUTH);
  }

  req.user = payload;

  next();
};
