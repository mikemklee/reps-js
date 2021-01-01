const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
  kg: {
    type: Number,
    default: 0,
  },
  reps: {
    type: Number,
    default: 0,
  },
  km: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
});

module.exports = {
  setSchema,
};
