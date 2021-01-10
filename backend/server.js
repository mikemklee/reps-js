require('colors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser'); // parse cookie header
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const exerciseRoutes = require('./routes/exercises');
const routineRoutes = require('./routes/routines');

const connectDB = require('./config/db');
const passportConfig = require('./config/passport');
const { errorHandler, notFound } = require('./middleware/errors');
const middlewareLog = require('./middleware/logs');

connectDB();

const app = express();

app.use(middlewareLog);

// configure cookie
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_COOKIE_KEY],
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: process.env.CLIENT_HOME_URL, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);

const clientBuildPath = path.join(__dirname, '/../frontend/build');
const clientIndexPath = path.resolve(clientBuildPath, 'index.html');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => res.sendFile(clientIndexPath));
}

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect(process.env.CLIENT_HOME_URL);
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get('/', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies,
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
