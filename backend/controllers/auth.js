const passport = require('passport');
const _ = require('lodash');

const {
  upgradeUserPreferences,
  getDefaultPreferences,
} = require('../utils/auth');

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

const { generateToken } = require('../utils/auth');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Routine = require('../models/Routine');
const Workout = require('../models/Workout');

// TODO: implement
// @desc    Authenticate user and get token
// @route   POST /api/users/auth/login
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    // user with the provided email has been found
    // check if provieded password is valid
    const passwordMatch = await user.matchPassword(password);
    if (passwordMatch) {
      res.json({
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
      return;
    }
    res.status(401).json({
      message: 'Password is invalid',
    });
  } else {
    res.status(404).json({
      message: 'User with the provided email not found',
    });
  }
};

// TODO: implement
// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: 'User with the provided email already exists',
    });
    return;
  }

  const user = await User.create({
    email,
    name,
    password,
  });

  if (user) {
    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({
      message: 'Could not create user. Provided user data is invalid.',
    });
  }
};

// @desc    Fetch authenticated user's data
// @route   GET /api/auth/login/success
// @access  Private
const getUserData = async (req, res) => {
  if (req.user) {
    const userData = req.user;
    userData.preferences = upgradeUserPreferences(userData.preferences);

    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: userData,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'failed to authenticate user',
    });
  }
};

// @desc    Update user's preference settings
// @route   POST /api/auth/:id/preferences
// @access  Private
const updateUserPreferences = async (req, res) => {
  const { user, body } = req;

  // TODO: validate request body

  // get existing preference settings (get defaults if none found)
  const updatedPreferences = user.preferences || getDefaultPreferences();

  // add or update requested preference settings
  _.forEach(body.preferencesData, (value, key) => {
    updatedPreferences.set(key, value);
  });
  user.preferences = updatedPreferences;

  // update user in DB
  try {
    await user.save();
  } catch (err) {
    res.status(400).json({
      message: 'could not update user',
    });
    return;
  }

  res.status(200).json(updatedPreferences);
};

// @desc    Send error response when authentication fails
// @route   GET /api/auth/login/failed
const loginFail = async (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
};

// @desc    Redirect to client on logout
// @route   GET /api/auth/logout
const logout = async (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
};

// @desc    Authenticate user via google
// @route   GET /api/auth/google
const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// @desc    Redirect to client after successful authentication via google
// @route   GET /api/auth/google/redirect
const googleLoginRedirect = passport.authenticate('google', {
  successRedirect: CLIENT_HOME_PAGE_URL,
  failureRedirect: '/auth/login/failed',
});

// @desc    Delete an existing user profile
// @route   DELETE /api/auth/:id
const deleteUser = async (req, res) => {
  const { user } = req;

  const userId = req.params.id;

  // check if provided user id matches user stored in session
  if (!user._id.equals(userId)) {
    res.status(403).json({
      message: `Provided user id "${userId}" does not match current user id`,
    });
    return;
  }

  // delete all user routines
  try {
    await Routine.deleteMany({
      _id: {
        $in: user.routineIds,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: 'could not delete user routines from DB',
    });
    return;
  }

  // delete all user exercises
  try {
    await Exercise.deleteMany({
      _id: {
        $in: user.exerciseIds,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: 'could not delete user exercises from DB',
    });
    return;
  }

  // delete all user workouts
  try {
    await Workout.deleteMany({
      _id: {
        $in: user.workoutIds,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: 'could not delete user workouts from DB',
    });
    return;
  }

  // delete user from DB
  try {
    await user.remove();
  } catch (err) {
    res.status(400).json({
      message: 'could not delete user from DB',
    });
    return;
  }

  res.status(200).json({});
};

module.exports = {
  authUser,
  registerUser,
  loginFail,
  logout,
  googleLogin,
  googleLoginRedirect,
  getUserData,
  updateUserPreferences,
  deleteUser,
};
