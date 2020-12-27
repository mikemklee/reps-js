const ExercisePreset = require('../models/ExercisePreset');

// @desc    Fetch all exercise presets
// @route   GET /api/exercises/presets
// @access  Private
const getExercisePresets = async (req, res) => {
  const exercisePresets = await ExercisePreset.find({});
  res.json(exercisePresets);
};

module.exports = { getExercisePresets };
