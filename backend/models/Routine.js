const mongoose = require('mongoose');

const { setSchema } = require('./Set');

const routineSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: 'New routine',
  },
  exercises: [
    {
      exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exercise',
      },
      sets: [setSchema],
    },
  ],
  isPreset: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
