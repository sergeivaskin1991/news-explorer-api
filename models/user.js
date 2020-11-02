const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');
const { TRIM, EMAIL, INCORRECT_LOGIN } = require('../errors/messageError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.trim(v),
      message: TRIM,
    },
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} ${EMAIL}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
{
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function loginController(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INCORRECT_LOGIN));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INCORRECT_LOGIN));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
