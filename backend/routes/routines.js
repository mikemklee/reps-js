const express = require('express');

const {
  getUserRoutines,
  createRoutine,
  getRoutinePresets,
} = require('../controllers/routines');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getUserRoutines);
router.route('/').put(protect, createRoutine);
router.route('/presets').get(protect, getRoutinePresets);

module.exports = router;
