const mongoose = require('mongoose');

const routineSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: 'New routine',
  },
  exercises: [
    {
      presetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ExercisePreset',
      },
      numSets: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
