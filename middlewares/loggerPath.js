const loggerPath = (req, res, next) => {
  console.log('Запрашиваемый путь — ', req.path);
  next();
};

module.exports = loggerPath;
