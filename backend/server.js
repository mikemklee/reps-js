import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errors.js';

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
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
