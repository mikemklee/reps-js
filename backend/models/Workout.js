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

const workoutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: 'New blank workout',
    },
    routineId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Routine',
    },
    duration: {
      type: Number,
      required: true,
    },
    exercises: [
      {
        presetId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'ExercisePreset',
        },
        sets: [setSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
