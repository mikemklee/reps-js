const jwt = require('jsonwebtoken');

const User = require('../models/User');

const protect = async (req, res, next) => {
  // TODO: use this middleware when supporting users with email/password authentication?
  // TODO: no-op for now
  next();
  // let token;

  // const authHeader = req.headers.authorization;
  // if (authHeader && authHeader.startsWith('Bearer')) {
  //   try {
  //     token = authHeader.split(' ')[1];
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //     req.user = await User.findById(decoded.id).select('-password');

  //     // TODO: error out if no user is found

  //     next();
  //     return;
  //   } catch (err) {
  //     console.error(err);
  //     res.status(401).json({
  //       message: 'Not authorized. Token verification failed.',
  //     });
  //     return;
  //   }
  // }

  // if (!token) {
  //   res.status(401).json({
  //     message: 'Not authorized. No token found.',
  //   });
  //   return;
  // }

  // next();
};

module.exports = { protect };
