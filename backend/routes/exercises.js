const express = require('express');

const {
  getExercisePresets,
  getExerciseNames,
} = require('../controllers/exercises');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/presets').get(protect, getExercisePresets);
router.route('/names').get(protect, getExerciseNames);

module.exports = router;
