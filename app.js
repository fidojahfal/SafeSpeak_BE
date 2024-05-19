import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import defaultRouter from './routes/defaultRoutes.js';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', defaultRouter);
app.use('/api/v1/users', userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
