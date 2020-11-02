const validator = require('validator');
const BadRequestError = require('../errors/bad-request-err');
const { URL } = require('../errors/messageError');

// Валидация адреса
module.exports = (v) => {
  if (!validator.isURL(v)) {
    throw new BadRequestError(URL);
  } else {
    return v;
  }
};
