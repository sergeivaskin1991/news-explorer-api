const mongoose = require('mongoose');
const validator = require('validator');
const URL = require('../errors/messageError');

const cardSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} ${URL}`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} ${URL}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
    ref: 'user',
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('article', cardSchema);
