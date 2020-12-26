const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
  kg: { type: Number, required: true },
  reps: { type: Number, required: true },
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
        // exerciseId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   required: true,
        //   ref: 'Exercise',
        // },
        exerciseId: {
          type: String,
          required: true,
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
