require('colors');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts');
const exerciseRoutes = require('./routes/exercises');
const { errorHandler, notFound } = require('./middleware/errors');

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);

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
