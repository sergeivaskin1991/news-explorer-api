const NotFoundError = require('./not-found-err');
const { NOT_FOUND } = require('./messageError');

module.exports = () => {
  throw new NotFoundError(NOT_FOUND);
};
