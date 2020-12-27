const express = require('express');

const { getExercisePresets } = require('../controllers/exercises');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/presets').get(protect, getExercisePresets);

module.exports = router;
