const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/user');

require('dotenv').config();

// Регистрация пользователя
module.exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(escape(password), 10);
    const user = await User.create({
      name: escape(name),
      email: escape(email),
      password: hash,
    });
    return res.send({
      name: user.name, email: user.email,
    });
  } catch (err) {
    return next(err);
  }
};

// Залогинивание пользователя
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-strong-secret',
      { expiresIn: '7d' },
    );

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
    return res.send({
      jwt: token,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    return await res.clearCookie('jwt', {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
      .send('User logged out successfully');
  } catch (err) {
    return next();
  }
};
