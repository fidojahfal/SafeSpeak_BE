import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import defaultRouter from './routes/defaultRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import articleRouter from './routes/articleRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/v1', defaultRouter);
app.use('/v1/users', userRouter);
app.use('/v1/reports', reportRouter);
app.use('/v1/articles', articleRouter);

app.use((err, req, res, next) => {
  const error = err.message || 'Internal server error';
  res.status(500).json({ message: error });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
