// Обработчик ошибок
const { CAST_ERR, EMAIL_USE } = require('../errors/messageError');

function HandlerError(err, req, res, next) {
  let { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = CAST_ERR;
  } else if (err.code === 11000) {
    statusCode = 409;
    message = EMAIL_USE;
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка' : message,
  });
  next();
}
module.exports = HandlerError;
