require('colors');
const mongoose = require('mongoose');

const exercisePresetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bodyParts: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExercisePreset = mongoose.model('ExercisePreset', exercisePresetSchema);

module.exports = ExercisePreset;
