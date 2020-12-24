import express from 'express';

import { getUsers, authUser, registerUser } from '../controllers/users.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').put(registerUser);
router.route('/').get(protect, getUsers);
router.route('/login').post(authUser);

export default router;
