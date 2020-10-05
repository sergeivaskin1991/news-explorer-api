const NotFoundError = require('./not-found-err');
const { NOT_FOUND } = require('./messageError');

// Обработка некорректного адреса
module.exports = () => {
  throw new NotFoundError(NOT_FOUND);
};
