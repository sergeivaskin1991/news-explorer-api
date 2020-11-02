const NotFoundError = require('./errors/not-found-err');
const { NOT_FOUND } = require('./errors/messageError');

// Обработка некорректного адреса
module.exports = () => {
  throw new NotFoundError(NOT_FOUND);
};
