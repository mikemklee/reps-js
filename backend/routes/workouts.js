import express from 'express';

import { getWorkoutLogs, saveWorkout } from '../controllers/workouts.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').put(saveWorkout);
router.route('/').get(protect, getWorkoutLogs);

export default router;
