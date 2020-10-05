const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NO_USER = require('../errors/messageError');

// Полечние пользователя
module.exports.getUser = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const user = await User.findById(owner)
      .orFail(() => new NotFoundError(NO_USER));
    return res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return next(err);
  }
};
