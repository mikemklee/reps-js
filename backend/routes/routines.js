const express = require('express');

const { getRoutinePresets, createRoutine } = require('../controllers/routines');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').put(protect, createRoutine);
router.route('/presets').get(protect, getRoutinePresets);

module.exports = router;
