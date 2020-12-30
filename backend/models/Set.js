const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
  kg: {
    type: Number,
    default: 0,
    required: true,
  },
  reps: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = {
  setSchema,
};
