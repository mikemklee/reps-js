const _ = require('lodash');

const ExercisePreset = require('../models/ExercisePreset');

// @desc    Fetch all exercise presets
// @route   GET /api/exercises/presets
// @access  Private
const getExercisePresets = async (req, res) => {
  const exercisePresets = await ExercisePreset.find({});
  res.json(exercisePresets);
};

// @desc    Fetch all exercise names
// @route   GET /api/exercises/names
// @access  Private
const getExerciseNames = async (req, res) => {
  // TODO: also aggregate user-defined exercises?
  const exercisePresetNames = await ExercisePreset.find({}, 'name');
  const nameMap = {};
  _.forEach(exercisePresetNames, (exercise) => {
    nameMap[exercise._id] = exercise.name;
  });
  res.json(nameMap);
};

module.exports = { getExercisePresets, getExerciseNames };
