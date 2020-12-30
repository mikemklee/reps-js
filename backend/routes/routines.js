const express = require('express');

const {
  getUserRoutines,
  createRoutine,
  getRoutinePresets,
  editUserRoutine,
  deleteUserRoutine,
} = require('../controllers/routines');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getUserRoutines);
router.route('/').put(protect, createRoutine);
router.route('/presets').get(protect, getRoutinePresets);
router.route('/:id').post(protect, editUserRoutine);
router.route('/:id').delete(protect, deleteUserRoutine);

module.exports = router;
