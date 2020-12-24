import { generateToken } from '../utils/auth.js';
import User from '../../../reps/backend/models/User.js';

// @desc    Fetch all users
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// @desc    Authenticate user and get token
// @route   POST /api/users/login
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
    } else {
      res.status(401).json({
        message: 'Password is invalid',
      });
      return;
    }
  } else {
    res.status(404).json({
      message: 'User with the provided email not found',
    });
    return;
  }
};

// @desc    Register a new user
// @route   POST /api/users/login
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
    return;
  } else {
    res.status(400).json({
      message: 'Could not create user. Provided user data is invalid.',
    });
    return;
  }
};

export { getUsers, authUser, registerUser };
